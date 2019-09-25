import * as React from "react";
import {Link} from "react-router-dom";
import "./about.scss";
import * as photo1 from "../../assets/aboutTeam.jpg";

class About extends React.Component{
    render(){
        const imgInlineStyle = {width:"100%",height:"100%"}
        return (
            <div className="about-container">
                <h1>About Us</h1>
                <div className="content-container">
                    <div className="row">
                        <div className="column">
                            <img src={photo1} alt="teamPic" style={imgInlineStyle}/>
                        </div>
                        <div className="column">
                            <p className="content-container--text">
                            We are here to announce that a football tournament is going to be held 
                            for all the ex students of sarada vidyapith. Those who are interested 
                            we would like them to be a part of this initiative. So it's our humble
                            request to all our batch mates and seniors juniors who had passed out 
                            from Sarada Vidyapith,to come and be a part of it.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <h5>WHO WE ARE</h5>
                            <p className="content-container--text">
                            We are bunch of ex-students of Sarada Vidyapith who are also pretty 
                            much football fanatics. We invite you to this league to showcase your 
                            football skills while enjoying the game. Do you have what it takes to 
                            be a champion? Then join the league, and play for ultimate glory
                            </p>
                            <div className="link-container">
                                <Link to="/register" className="btn btn-primary">Register Here</Link>
                                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;