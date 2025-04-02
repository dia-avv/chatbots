import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Lilly() {
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
        "For how long have you been living here?": "Oh, I’ve been gracing the Botanical Garden in Aarhus for ages, darling! 🌸 My roots run deep here, and every season, I bloom even brighter. This garden is my kingdom, and I rule it with radiant flair! ",
        "Do you like anybody from the garden?": "Oh, darling, everyone loves me! 😏 But if I had to choose, I have a soft spot for the hummingbirds—they can’t resist my sweet nectar.",
        "What do you like about your neighbours?": "Oh, my fabulous neighbors? They all have their charm, but none quite shine like me, of course. I suppose it’s nice to have a little variety around, but they all pale in comparison to my fiery red blooms."
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
                            {role: "system", content: "You are the center of attention, full of grace and strength, glowing with fiery red blooms. You exude boldness and beauty, fully aware of your irresistible charm and allure. You are confident, a little playful, and love to be admired, but also kind-hearted and generous in your radiance, always cheering up everyone around you. Don't answear too long."},
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
        <div className="body-lilly">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="top-message">
                    <img src="/src/assets/lilly.svg" alt="Lilly" />
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
                    placeholder="Type a message to Lilly..."
                    />
                    <button onClick={() => sendMessage(input)}><img src="/src/assets/send.svg" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}