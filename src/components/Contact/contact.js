import * as React from "react";
import Users from "../../data/mods";
import ContactCard from "./ContactCard";
import "./contact.scss";


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moderators : Users
        };
    }
    render() {
        return (
            <div className="container">
                <h1>Contact us</h1>
                <div className = "cards-container">
                    {this.state.moderators.map((user,index) => {
                        return <ContactCard userInfo={user} key={index} />
                    })}
                </div>
            </div>
        );
    }
}

export default Contact;
