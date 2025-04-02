import next from '../assets/next.svg';
import back from '../assets/backbutton.svg';
import robert from '../assets/robert.svg';

export default function RobertMessage() {
    return (
            <div className="body-robert">
                <div className="back-button">
                    <img src={back} alt="Back" />
                    <h3>Back to map</h3>
                </div>
                <div className="chat-container">
                    <div className="audio-message-robert">
                        <img src={robert} alt="Robert" />
                    </div>
                    <div className='message-box'>
                        <p className='message-text'>Greetings, I’m Robert the Giant (Traveler’s Palm, Ravenala madagascariensis) — the kind, handsome, and protective traveler of our garden. I stand tall with big, fan‑shaped leaves that capture up to 1 liter of rainwater like little pools, offering refreshment and shelter to every creature. I might look scary and unreachable, but many times I save lives with the water I provide.</p>
                    </div>   
                    <div className="next-buttons">
                        <button>Chat With Me</button>
                        <img src={next} />
                    </div>  
                </div>
            </div>
        );
}