import * as React from "react";

class ModalContent extends React.Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default ModalContent;