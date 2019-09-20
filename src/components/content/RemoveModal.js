import * as React from "react";
import "./RemoveModal.scss";
import Modal from "../common/Modal/Modal";
import ModalContent from "../common/Modal/ModalContent/ModalContent";

class RemoveModal extends React.Component {
    render() {
        return(
            <Modal
                onModalClose={this.props.onModalClose}
            >
                <ModalContent>
                    <div className="modal-heading">
                        <h5>Are you Sure You want to remove this player?</h5>
                        <h6>This action cant be undone</h6>
                    </div>
                    <div className="modal-body">
                        <button 
                            className="btn btn-cancel" 
                            type="button"
                            onClick={this.props.onModalClose}
                        >
                                Cancel
                        </button>
                        <button 
                            className="btn btn-confirm"
                            type="button"
                            onClick={this.props.onModalAction}
                        >
                                 Delete
                            </button>
                    </div>
                </ModalContent>
            </Modal>
        )
    }
}
export default RemoveModal;