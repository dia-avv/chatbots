import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Petra() {
    const [messages, setMessages] = useState ([]);
    const [input, setInput] = useState("");

    const API_KEY = process.env.REACT_APP_API_KEY;

    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behaviour: "smooth"
            });
        }
    }, [messages]);

    const presetResponses = {
        "For how long have you been living here?": "I’ve lived here for over forty years, watching the garden grow and change with each season. Time seems to fly when you’re surrounded by such beauty.",
        "Do you like anybody from the garden?": "Oh, my dear, I care deeply for every plant and creature in this garden. Each one has its own charm and purpose.💜",
        "What do you like about your neighbours?": "Ah, my neighbors, yes. They’re a kind bunch, always respectful of the garden’s quiet pace. We may not speak often, but there’s a warm understanding between us. It’s a peaceful harmony, like the garden itself."
    };

    const sendMessage = async (message = input) => {
        if (!message || typeof message !== "string" || !message.trim()) return;

        const userMessage = { text: message, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Check if the message matches any preset question
        if (presetResponses[message]) {
            const botMessage = { text: presetResponses[message], sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
            // send message to ai api
            try {
                const response = await axios.post(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        model: "gpt-4",
                        messages: [
                            {role: "system", content: "You are the queen of the botanical garden. You are calm, reserved, old, sweethearted and honest. You give off old godmother vibes and are a good leader, the whole garden knows it. Don't answear too long."},
                            {role: "user", content: message},
                        ],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${API_KEY}`, //api key
                        },
                    }
                );
                console.log("API Response: ", response);

                if (response.data && response.data.choices && response.data.choices[0]) {
                    const botMessage = { text: response.data.choices[0].message.content, sender: "bot" };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    console.error("Error: Response structure is not as expected", response);
                    setMessages((prevMessages) => [...prevMessages, {text: "Sorry, I am having trouble responding right nowsdfgsdf.", sender: "bot"}]);
                }
            } catch (error) {
                console.error ("Error:", error);
                setMessages((prevMessages) => [...prevMessages, {text: "Sorry, I am having trouble responding right now.", sender: "bot"}]);
            }
            setInput("");
        }
    };

    return (
        <div className="body-petra">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="top-message">
                    <img src="/src/assets/petra.svg" alt="Petra" />
                    <h4>My dear! Do you have any questions for me?</h4>
                </div>
                <div className="chat-box" ref={chatBoxRef}>
                    <div className="preset-questions">
                        <button className="question" onClick={() => sendMessage("For how long have you been living here?")}>
                            For how long have you been living here?
                        </button>
                        <button className="question" onClick={() => sendMessage("Do you like anybody from the garden?")}>
                            Do you like anybody from the garden?
                        </button>
                        <button className="question" onClick={() => sendMessage("What do you like about your neighbours?")}>
                            What do you like about your neighbours?
                        </button>
                    </div>
                    {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
                        {msg.text}
                    </div>
                    ))}
                </div>
                <div className="input-box">
                    <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message to Petra..."
                    />
                    <button onClick={() => sendMessage(input)}><img src="/src/assets/send.svg" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}