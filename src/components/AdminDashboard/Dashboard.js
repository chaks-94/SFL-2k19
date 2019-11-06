import * as React from "react";
import {Link} from "react-router-dom";
import "./Dashboard.scss";

class Dashboard extends React.Component {
    render() {
        return(
            <div className="admin-dashboard">
                <div className="dashboard-card">
                    <div 
                        className="card-content"
                    >
                        <Link className="admin-link" to="/players">Go to Registered Players List<br/></Link>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div
                        className="card-content"
                    >
                        <Link className="admin-link" to="/gallery">Add more photos to gallery</Link>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div
                        className="card-content"
                    >
                        <Link className="admin-link" to="/portal">Open/Close Registration Portal</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;