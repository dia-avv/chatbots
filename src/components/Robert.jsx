import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Robert() {
    const [messages, setMessages] = useState ([]);
    const [input, setInput] = useState("");

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
        "For how long have you been living here?": "Oh, I’ve been here for a solid few seasons now. Long enough to know I’m the center of attention, you know?",
        "Do you like anybody from the garden?": "Yeah, I’ve got my eye on a few of the pretty flowers around here. Can’t help it—they’re all just so charming. But hey, I’m too busy being fabulous to settle down.",
        "What do you like about your neighbours?": "I mean, they’re all cool in their own way. Some of the trees are pretty chill, and the flowers… well, they always smell amazing. But honestly, I just like how they all know I’m the highlight of the garden. Keeps things interesting, you know?"
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
                            {role: "system", content: "You are Robert, a young plant that lives in Botanical garden. You are in your prime, the goat. Classic popular guy in school that all the girls want. You are not too smart, but the looks are enough. You talk like a frat boy. Don't answear too long."},
                            {role: "user", content: message},
                        ],
                    },
                    {
                        headers: {
                            Authorization: `Bearer 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`, //api key
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
        <div className="body-robert">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="top-message-robert">
                    <img src="/src/assets/robert.svg" alt="Robert" />
                    <h4>My fabulous friend! Any questions for me?</h4>
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
                    placeholder="Type a message to Robert..."
                    />
                    <button onClick={() => sendMessage(input)}><img src="/src/assets/send.svg" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}