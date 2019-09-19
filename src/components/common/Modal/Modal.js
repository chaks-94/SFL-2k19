import * as React from "react";
import "./Modal.scss";

class Modal extends React.Component {
    render() {
        return(
            <div className="modal">
                {this.props.children}
            </div>
        )
    }
}
export default Modal;