import next from '../assets/next.svg';
import back from '../assets/backbutton.svg';
import lilly from '../assets/lilly.svg';

export default function LillyMessage() {
    return (
            <div className="body-lilly">
                <div className="back-button">
                    <img src={back} alt="Back" />
                    <h3>Back to map</h3>
                </div>
                <div className="chat-container">
                    <div className="audio-message">
                        <img src={lilly} alt="Lilly" />
                    </div>
                    <div className='message-box'>
                        <p className='message-text'>Hi there, I’m Lily Canna (Canna Lily, Canna indica) — Queen Petra’s oldest daughter! I’m the brightest flower in our garden, full of strength and grace. I live in rich, damp soil, and my red, lively blooms bring light to even the darkest corners. My strong roots have been used for a long time to make beautiful natural dyes and tasty treats. Hummingbirds love to visit me, sipping sweet nectar from my blossoms. I am the center of attention and love to cheer up every space I touch.</p>
                    </div>   
                    <div className="next-buttons">
                        <button>Chat With Me</button>
                        <img src={next} />
                    </div>  
                </div>
            </div>
        );
}