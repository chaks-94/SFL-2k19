import * as React from "react";
import "./RegistrationPortal.scss";
import RegistrationStatusService from "../../services/registrationStatusService";

class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationIsOpen: false,
            dataAvaialable: false
        }
    }
    componentDidMount() {
        RegistrationStatusService()
        .getStatus()
        .then((registrationIsOpen => {
            this.setState({
                registrationIsOpen,
                dataAvaialable: true,
            })
        }))
    }
    changeStatus = () => {
        RegistrationStatusService()
        .setStatus(!this.state.registrationIsOpen)
        .then((status) => {
            if(status === "success") {
                this.setState((prevState) => {
                    return {
                        registrationIsOpen : !prevState.registrationIsOpen,
                    }
                });  
            }
        });
    }
    render() {
        return(
            this.state.dataAvaialable && 
                <div className="registration-dashboard">
                <div className="current-status">
                    <h1>Registration is currently {this.state.registrationIsOpen ? "Open": "Closed"}</h1>
                </div>
                <div className="change-status">
                    <h4>Click the button below to {this.state.registrationIsOpen ? "close": "reopen"} registraion</h4>
                    <div className="status-change-button">
                        <button
                            className="btn btn-lg btn-primary"
                            onClick={this.changeStatus}
                        >
                            {this.state.registrationIsOpen ? "Close": "Reopen"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Portal;