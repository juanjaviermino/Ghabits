import React from "react";
import video from "../../assets/bgVideo.mp4";

function LandingPage () {
    return(
        <div className="landingpage">
            <div className="landingpage__overlay"></div>
            <video style={{width: '100%', height: '100%'}} className="landingpage__video" autoPlay loop muted src={video} type="video/mp4">a</video>
            <div className="landingpage__title">
                <h1 className="fs--logo-landing">G HABITS</h1>
                <p className="fs--slogan-landing">Bienvenido de vuelta, Bienvenido al éxito</p>
            </div>
        </div>  
    );
}

export default LandingPage;
