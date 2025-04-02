import next from '../assets/next.svg';
import back from '../assets/backbutton.svg';
import pedro from '../assets/pedro.svg';

export default function PedroMessage() {
    return (
        <div className="body-pedro">
            <div className="back-button">
                <img src={back} alt="Back" />
                <h3>Back to map</h3>
            </div>
            <div className="chat-container">
                <div className="audio-message">
                    <img src={pedro} alt="Pedro the Cactus" />
                    
                </div>
                <div className="message-box">
                    <p className="message-text">Watch your step — I’m Pedro (San Pedro Cactus, Trichocereus macrogonus), the adventurous son. My thick, water-storing stem keeps me strong during the driest times, showcasing my strong character and I thrive in sandy, well-drained soil with only a little water every few weeks.  My sharp spines serve as armor in the wilderness, protecting me from hungry predators. Each scratch on my skin tells a story of spirited freedom.</p>
                </div>
                <div className="next-buttons">
                    <button>Chat With Me</button>
                    <img src={next} />
                </div>
            </div>
        </div>
    );
}