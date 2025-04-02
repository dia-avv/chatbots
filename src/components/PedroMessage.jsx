export default function PedroMessage() {
    return (
        <div className="body-pedro">
            <div className="back-button">
                <img src="/src/assets/backbutton.svg" alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="audio-message">
                    <img src="/src/assets/pedro.svg" alt="Pedro the Cactus" />
                    
                </div>
                <div className="message-box">
                    <p className="message-text">I do not sway like the ferns. I do not dance in the wind like the vines. I stand still, rooted in my own silence, watching the world move around me.<br></br>
                    <br></br>
                    The garden is full of chatter—leaves rustling, petals gossiping about the visitors who admire them, water lilies basking in the sun’s gentle touch. They call me strange. Unwelcoming. Too sharp to be loved...</p>
                </div>
                <div className="next-buttons">
                    <button>Chat With Me</button>
                    <img src="/src/assets/next.svg" />
                </div>
            </div>
        </div>
    );
}