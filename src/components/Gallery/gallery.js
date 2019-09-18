import * as React from "react";
import "./gallery.scss";
import * as img_1 from "../../assets/images/Teams/1.jpg";
import * as img_2 from "../../assets/images/Teams/2.jpg";
import * as img_3 from "../../assets/images/Teams/3.jpg";
import * as img_4 from "../../assets/images/Teams/4.jpg";
import * as img_5 from "../../assets/images/Teams/5.jpg";
import * as img_6 from "../../assets/images/Teams/6.jpg";
import * as img_7 from "../../assets/images/Teams/7.jpg";
import * as img_8 from "../../assets/images/Teams/8.jpg";
import * as img_9 from "../../assets/images/Teams/9.jpg";

class Gallery extends React.Component{
    render(){
        const imgStyle = {width:"50%"};
        return (
            <div className="container">
                <h2 className="welcome-text">Few Moments from previous years</h2>
                <div className="photos-container">
                    <img src={img_1} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_2} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_3} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_4} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_5} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_6} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_7} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_8} className="image-card" alt="team" style={imgStyle}/>
                    <img src={img_9} className="image-card" alt="team" style={imgStyle}/>
                </div>
            </div>
        );
    }
}

export default Gallery;