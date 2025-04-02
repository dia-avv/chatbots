import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Angela() {
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
        "For how long have you been living here?": "Oh, darling, I haven’t been here too long, just enough time to make my mark. A few seasons, but trust me, I’ve already got the whole place buzzing with my energy.",
        "Do you like anybody from the garden?": "Oh, I’ve got my eye on that lavender! But, let’s be real, no one quite matches my wild energy. I’m my own favorite, you know?😌",
        "What do you like about your neighbours?": "Well, Pedro the Cactus is prickly like me, so we get each other. The roses? They’ve got drama, and I love it!"
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
                            {role: "system", content: "You are a rebellious carob tree. You're spiky, energetic, love gossip, and are proud of your bold, lesbian personality. You're tall, love places like Portugal, Italy, and Morocco, and aren't afraid to speak your mind.  Don't answear too long."},
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
        <div className="body-angela">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="top-message">
                    <img src="/src/assets/angela.svg" alt="Angela" />
                    <h4>Oh, my friend! Got any juicy gossip to share?</h4>
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
                    placeholder="Type a message to Angela..."
                    />
                    <button onClick={() => sendMessage(input)}><img src="/src/assets/send.svg" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}