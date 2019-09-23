import * as React from "react";
import "./DragAndDrop.scss";

class DragAndDrop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
        }
    }
    dropRef = React.createRef();

    componentDidMount() {
        this.dragCounter = 0;
        let div = this.dropRef.current;
        div.addEventListener("dragenter", this.handleDragin);
        div.addEventListener("dragleave", this.handleDragOut);
        div.addEventListener("dragover", this.handleDrag);
        div.addEventListener("drop",this.handleDrop);
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener("dragenter", this.handleDragin);
        div.removeEventListener("dragleave", this.handleDragOut);
        div.removeEventListener("dragover", this.handleDrag);
        div.removeEventListener("drop",this.handleDrop);
    }

    handleDragin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({
                dragging: true,
            })
        }
        
    }
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if(this.dragCounter > 0) return
        this.setState({
            dragging: false,
        })
    }
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            e.dataTransfer.clearData();
            this.dragCounter = 0;
            this.props.handleDrop(e.dataTransfer.files);
        }
    }

    render() {
        return (
            <div
                style={{display: 'inline-block', position:'relative', ...this.props.style}} 
                ref={this.dropRef}
            >
                {this.state.dragging && 
                <div
                    style={{
                        border: 'dashed gray 4px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        position: 'absolute',
                        top: 0  ,
                        bottom: 0   ,
                        left: 0 ,
                        right: 0    ,
                        zIndex: 999
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}    
                    >
                        <div>Drop here :-)</div>
                    </div>
                </div>}
                {this.props.children}
            </div>
        )
    }
}

export default DragAndDrop;