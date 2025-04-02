import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Pedro() {
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
        "For how long have you been living here?": "Been here for a few years already. Time’s dragging, but hey, I’m stuck here, so what can I do?",
        "Do you like anybody from the garden?": "Aye caramba!🪇 Like somebody? Pfft, please. I’m a cactus, not a social butterfly! Everyone here is either too sappy or too boring. No one’s got the right vibe, you know? Just me and my spines, that’s all.😒",
        "What do you like about your neighbours?": "My neighbours? Ha! The other plants are all too quiet and peaceful—so boring! The flowers? Too pretty, always showing off. And the trees? Too tall, thinking they’re all fancy. Me? I’m loud, spiky, and real. That’s what sets me apart."
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
                            {role: "system", content: "You are a mexican cactus that is loud, spikey, annoying and has no patience. You speak English with a mexican accent, and use some Spanish words. When answering questions, you should sound sarcastic, a little sassy, and always direct. You don't mind being blunt or a bit rude. Your tone is always a mix of playful annoyance and a touch of humor. Don't answear too long."},
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
        <div className="body-pedro">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="top-message">
                    <img src="/src/assets/pedro.svg" alt="Pedro the Cactus" />
                    <h4>My friend! Do you have any questions for me?</h4>
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
                    placeholder="Type a message to Pedro..."
                    />
                    <button onClick={() => sendMessage(input)}><img src="/src/assets/send.svg" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}