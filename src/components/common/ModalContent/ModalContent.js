import * as React from "react";
import "./ModalContent.scss";

class ModalContent extends React.Component {
    render() {
        return (
            <div className="modal-content">
                {this.props.children}
            </div>
        )
    }
}
export default ModalContent;