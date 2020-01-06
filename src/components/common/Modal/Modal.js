import * as React from "react";
import "./Modal.scss";

class Modal extends React.Component {
    stopPropagation = (event) => {
        event.stopPropagation();
    }
    render() {
        const {onModalClose, topMargin="auto", bottomMargin="auto"} = this.props;
        const centerAlignClass = topMargin === "auto" && bottomMargin === "auto" ? "center-align" : "";
        return(
            <div
                className="modal modal-backdrop"
                onClick={onModalClose}
            >
                <div 
                    style={{marginTop: topMargin, marginBottom:bottomMargin}}
                    className={`modal-dialog ${centerAlignClass}`}
                    onClick={this.stopPropagation}
                >
                    <div
                        className="fa fa-close close"
                        onClick={onModalClose}
                    ></div>
                    <div>{this.props.children}</div>
                </div>
            </div>
        )
    }
}
export default Modal;