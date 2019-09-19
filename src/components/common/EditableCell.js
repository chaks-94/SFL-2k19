import * as React from "react";

class EditableCell extends React.Component {
    render() {
        const {isEditable,data,field} = this.props;
        let displayElement;

        if(isEditable) {
            displayElement = 
            <select
                value = {data[field]}
                onChange = {(event) => this.props.handleChange(event,data)}
            >
                <option value={true}>Complete</option>
                <option value={false}>Not Complete</option>
            </select>
        } else {
            displayElement = <span>{data[field] ? "Complete" : "Not Complete"}</span>
        }

        return (
            <div>
                {displayElement}
            </div>
        )
    }
}

export default EditableCell;