import next from '../assets/next.svg';
import back from '../assets/backbutton.svg';
import petra from '../assets/petra.svg';

export default function PetraMessage() {
    return (
            <div className="body-petra">
                <div className="back-button">
                    <img src={back} alt="Back" />
                    <h3>Back to map</h3>
                </div>
                <div className="chat-container">
                    <div className="audio-message">
                        <img src={petra} alt="Queen Petra" />
                    </div>
                    <div className='message-box'>
                        <p className='message-text'>Hello, I’m Queen Petra — the Purple Wreath (Petrea volubilis). As mother to Sofia, Lily, and Angela, I watch over my blooming daughters from high above, my coat is made from violet‑blue flowers. I have created our home warm, humid and sunny — I attract busy bees and butterflies as guests and treat them with a sweet nectar. People plant me along fences and trellises to create living purple curtains that brighten gardens. That is a way for me to protect my family. Can you spot my star‑shaped petals sparkling in the sunlight?</p>
                    </div>   
                    <div className="next-buttons">
                        <button>Chat With Me</button>
                        <img src={next} />
                    </div>  
                </div>
            </div>
        );
}