import * as React from "react";
import "./contactCard.scss";

class ContactCard extends React.Component {
    render() {
        const {userInfo} = this.props;
        const inlineStyle = {
            width: '100%'
        };
        return (
            <div className="card">
                <img src={userInfo.image} alt={userInfo.name} style={inlineStyle} />
                    <h1>{userInfo.name}</h1>
                    <p className="title">{userInfo.position}</p>
                    <a href={`https://wa.me/${userInfo.phone}`}><i className="fa fa-whatsapp"></i></a>
                    <p><a className="btn btn-contact" href={`tel:+${userInfo.phone}`}>Reach {userInfo.name}</a></p>
            </div>
        )
    }
}

export default ContactCard;