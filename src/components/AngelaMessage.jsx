import next from '../assets/next.svg';
import back from '../assets/backbutton.svg';
import angela from '../assets/angela.svg';

export default function AngelaMessage() {
    return (
            <div className="body-angela">
                <div className="back-button">
                    <img src={back} alt="Back" />
                    <h3>Back to map</h3>
                </div>
                <div className="chat-container">
                    <div className="audio-message">
                        <img src={angela} alt="Angela" />
                    </div>
                    <div className='message-box'>
                        <p className='message-text'>Greetings, I’m Angela (Carob Tree, Ceratonia siliqua) — the rebellious daughter of our garden family. I’m a flowering evergreen tree, forever young and full of energy.<br></br> My appearance might seem a bit spiky because of my brown pods, but they serve as a natural chocolate substitute, packed with fiber and calcium. Among my sisters, I grow the tallest — reaching up to 15 meters. My favorite places are Portugal, Italy, and Morocco, where the carob tree is celebrated and widely produced.</p>
                    </div>   
                    <div className="next-buttons">
                        <button>Chat With Me</button>
                        <img src={next} />
                    </div>  
                </div>
            </div>
        );
}