import * as React from "react";
import { Link } from 'react-router-dom';
import "./home.scss";

class Home extends React.Component {
    render() {
        const h1Style = {
            fontSize: "50px",
        }
        return (
            <main>
               <div className="landing-image">
                    <div className="landing-text">
                        <h1 style={h1Style}>This is SFL 2k19</h1>
                        <p>The tournament you have been waiting for</p>
                        <Link className="btn btn-register" to="/register">Go On and register</Link><br></br>
                        {
                            !this.props.isAdmin && 
                            <Link className="btn btn-login" to="/login">Admin Login</Link>
                        }
                    </div>
               </div>

            </main>
        );
    }
}

export default Home;