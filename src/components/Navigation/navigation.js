import React from 'react';
import { Link } from 'react-router-dom';
import "./navigation.scss";
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

    signOut = () => {
        console.log("Sigining out");
        this.props.onLogout();
    }

    render() {
        const {isAdmin,userDetails} = this.props.userInfo;
        return(
            <nav className="nav">
                <div className="nav-start">
                    <ul>
                        <button className="btn-close" onClick={this.toggleButton}><i className={`fa ${this.state.buttonIcon}`}></i></button>
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
                                    <Link className="link" to="/teams">Teams</Link>
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
                </div>
                <div className="nav-end">
                        {
                            isAdmin &&
                                <>
                                    <div className="user-info">
                                        <span className="user-name">Hello {userDetails.fullName}</span>
                                        <i className="fa fa-caret-down dropdown-arrow"></i>
                                    </div>
                                    { this.state.navDisplay &&
                                        <div className="user-dropdown">
                                            <button className="btn-logout" type="button" onClick={this.signOut}>
                                                Log Out
                                            </button>
                                        </div>
                                    }
                                </>
                        }
                </div>
            </nav>
        )
    }
}
export default Navigation;