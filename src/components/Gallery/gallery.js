import * as React from "react";
import "./gallery.scss";
import { DownloadAll } from "../../services/downloadService";
import DragAndDrop from "../common/DragAndDrop/DragAndDrop";
import BulkUpload from "../../services/BulkUpload";
import Loader from "../common/Loader/Loader";
class Gallery extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pictureUrls: [],
            displayImages: false,
            workInProgress: false,
        }
    }
    uploadMobileRef = React.createRef();
    componentDidMount() {
        this.setState({
            ...this.state,
            workInProgress: true,
        },this.downloadAllImages())
    }

    downloadAllImages = () => {
        DownloadAll()
            .then((data) => {
                this.setState({
                    ...this.state,
                    pictureUrls:data,
                    displayImages: true,
                    workInProgress: false,
                })
            })
            .catch((error) =>{
                console.log(error);
                alert("Something went wrong! Could not Load images");
                this.setState({
                    ...this.state,
                    workInProgress: false,
                })
            })
    }

    generateImageHtml = () => {
        const imgStyle = {width:"50%"};

        return this.state.pictureUrls.map((url,index) => {
            return <img key={index} src={url} className="image-card" alt="team" style={imgStyle}/>
        });
    } 

    handleDrop= (files) => {
        this.setState({
            ...this.state,
            workInProgress: true,
        })
        let count = this.state.pictureUrls.length;
        const newFiles = [...files].map((file,index) => {
            file[`newName`] = count+index+1;
            return file;
        })
        BulkUpload(newFiles)
            .then((messages) => {
                const allUploaded = messages.every((message) => {
                    return message === "success";
                });
                if(allUploaded) {
                    this.downloadAllImages();
                } else {
                    alert("Something went wrong, please try again later");
                    this.setState({
                        ...this.state,
                        workInProgress: false,
                    })

                }
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong, please try again later");
                this.setState({
                    ...this.state,
                    workInProgress: false,
                })
            })
    }

    handleMobileClick = () => {
        this.uploadMobileRef.current.click();
    }

    onUploadChange= (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.handleDrop(e.target.files);
    }

    render(){
        return (
            <div className="container">
                <h2 className="welcome-text">Few Moments from previous years</h2>
                {this.props.isAdmin && 
                    <div className="upload-container">
                        <DragAndDrop 
                            handleDrop = {this.handleDrop}
                            style = {{
                                width: '100%',
                            }}
                        >
                            <div className="drag-drop-container">Drag and drop photos in this space to upload</div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                ref={this.uploadMobileRef}
                                onChange={this.onUploadChange}
                            />
                            <button
                                className="mobile-only"
                                onClick={this.handleMobileClick}
                            >Upload photos</button>
                        </DragAndDrop>
                    </div>
                }
                <div className="photos-container">
                    {this.state.displayImages && 
                        this.generateImageHtml()
                    }
                </div>
                {this.state.workInProgress && 
                <Loader></Loader>}
            </div>
        );
    }
}

export default Gallery;