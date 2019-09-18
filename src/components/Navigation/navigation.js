import React from 'react';
import { Link } from 'react-router-dom';
import "./navigation.scss"
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIcon: "fa-close",
            navDisplay: true,
        }
    }
    toggleButton = () => {
        let {buttonIcon} = this.state;
        this.setState({
            buttonIcon: buttonIcon === "fa-close" ? "fa-bars" : "fa-close",
            navDisplay: !(buttonIcon === "fa-close")
        })
    }
    render() {
        return(
            <nav className="globalNav">
                <ul>
                    <button onClick={this.toggleButton}><i className={`fa ${this.state.buttonIcon}`}></i></button>
                    {this.state.navDisplay &&
                        <React.Fragment>
                            <li>
                                <Link className="link" to="/home">Home</Link>
                            </li>
                            <li>
                                <Link className="link" to="/register">Register</Link>
                            </li>
                            <li>
                                <Link className="link" to="/about">About us</Link>
                            </li>
                            <li>
                                <Link className="link" to="/gallery">Gallery</Link>
                            </li>
                            <li>
                                <Link className="link" to="/contact">Contact Us</Link>
                            </li>
                            <li>
                                <Link className="link" to="/players">Players List</Link>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        )
    }
}
export default Navigation;