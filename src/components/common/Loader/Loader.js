import * as React from "react";
import "./Loader.scss";

class Loader extends React.Component {
    render() {
        return (
            <div className="loader-overlay">
                <i className="fa fa-spinner fa-spin loader-content"></i>
            </div>
        )
    }
}
export default Loader;