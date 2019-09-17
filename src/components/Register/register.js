import * as React from "react";
import "./register.scss";  
import { UploadFile } from "../../services/uploadService";
import RegisterService from "../../services/RegisterService";

class RegisterPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerInfo : {
                fullName: "",
                phone: "",
                lastTeam: "",
                foot: "r",
                position: "mid",
                photo: null,
                passYear: "",
                paymentStatus: false,
            },
            formSubmitStatus: false, 
            upload: {
                uploadMessage: "",
                uploadStatus: false,
            },
            formValidation: {
                errors: {
                    fullName: "",
                    phone: "",
                    passYear:"",
                },
                fullName: false,
                phone: false,
                passYear: false,
                formValid: false,
            }
        }
    };

    handleChange = (event) => {
        const target = event.target;
        this.setState((state) => {
            return {
                    ...state,
                    playerInfo: {
                    ...state.playerInfo,
                    [target.name]: target.type === "file" ? target.files[0] : target.value,
                }
            }
        },() =>{
            this.validateFields(target.name,target.value);
        });
    }

    validateFields = (fieldName,value) => {
        let { errors,
            fullName,
            phone,
            passYear
        } = this.state.formValidation;

            switch(fieldName) {
                case "fullName": 
                    fullName = value.length > 0;
                    errors.fullName = fullName ? "":  "name cannot be empty";
                    break;
                case "phone" :;
                    phone = /\d{10}/.test(value);
                    errors.phone = phone ? "" : "Provide a proper 10 digit mobile number";
                    break;
                case "passYear": ;
                    passYear = /\d{4}/.test(value) && value < 2025;
                    errors.passYear = passYear ? "" : "Please provide proper pass out year";
                    break
                default:
                    break;
            }

            this.setState({
                ...this.state,
                formValidation: {
                    ...this.state.formValidation,
                    errors,
                    fullName,
                    phone,
                    passYear
                }
            },
            this.validateForm)
    }

    validateForm = () => {
        let {
            fullName,
            phone,
            passYear
        } = this.state.formValidation;
        this.setState({
            ...this.state,
            formValidation: {
                ...this.state.formValidation,
                formValid: fullName && phone && passYear
            }
        })
    }

    clearFields= () => {
        this.setState({
            playerInfo: {
                fullName: "",
                phone: "",
                lastTeam: "",
                foot: "r",
                passYear: "",
                position: "mid",
                paymentStatus: false,
            },
            upload: {
                uploadMessage: "",
                uploadStatus: false,
            },
            formValidation: {
                errors: {
                    fullName: "",
                    phone: "",
                    passYear: "",
                },
                fullName: false,
                phone: false,
                passYear: false,
                formValid: false,
            }
        })
    }

    handleSubmit = () => {
        const {playerInfo} = this.state;
        RegisterService(playerInfo)
            .then((data) => {
                console.log(data);
                if(data === "success") {
                    this.setState({
                        ...this.state,
                        formSubmitStatus: true,
                    });
                }
            })
    }

    handleUpload = () => {
        const {fullName,passYear, photo} = this.state.playerInfo;
        let uploadMessage,uploadStatus = false;
        if (photo.size > 3145728) {
            uploadMessage = "Max upload size is 1Mb, please upload a image lesser than 1Mb size";
            uploadStatus = false;
            this.setState({
                ...this.state,
                ...this.state,
                upload: {
                    uploadMessage,
                    uploadStatus
                }
            })
        } else {
            if (fullName === "" || passYear === "") {
                uploadMessage = "Please enter fullname and passout year before uploading photo";
                uploadStatus = false;
                this.setState({
                    ...this.state,
                    ...this.state,
                    upload: {
                        uploadMessage,
                        uploadStatus
                    }
                })
            } else {
                UploadFile(`${fullName}_${passYear}`, this.state.playerInfo.photo)
                    .then((data) => {
                        console.log(data);
                        if (data === "success") {
                            uploadMessage = "Photo Uploaded successfully";
                            uploadStatus = true;
                        } else {
                            uploadMessage = "Something went wrong, please try again"
                        }
                        this.setState({
                            ...this.state,
                            ...this.state,
                            upload: {
                                uploadMessage,
                                uploadStatus
                            }
                        })
                    })
            }
        }
    }

    render() {
        return(
            <div className="registration-container">
                <form>
                    <div className="row">
                        <h4>Basic Info</h4>
                        <div className="input-group input-group-icon">
                            <input 
                                type="text" 
                                name="fullName"
                                disabled={this.state.formSubmitStatus}
                                placeholder="Full Name"
                                onChange={this.handleChange}
                            />
                            <div className="input-icon"><i className="fa fa-user"></i></div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input 
                                type="number"
                                name="phone"
                                disabled={this.state.formSubmitStatus}
                                maxLength="10"
                                placeholder="Contact Number"
                                onChange={this.handleChange}
                            />
                            <div className="input-icon"><i className="fa fa-mobile"></i></div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                type="number"
                                name="passYear"
                                disabled={this.state.formSubmitStatus}
                                maxLength="4"
                                placeholder="Passout year from School"
                                onChange={this.handleChange}
                            />
                            <div className="input-icon"><i className="fa fa-clock-o"></i></div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                type="text"
                                name="lastTeam"
                                disabled={this.state.formSubmitStatus}
                                placeholder="Previous Team"
                                onChange={this.handleChange}
                            />
                            <div className="input-icon"><i className="fa fa-users"></i></div>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Playing Info</h4>
                        <div className="input-group col-12">
                            <div className="col-half">
                                <h5>Preffered Foot</h5>
                                <select
                                    name="foot"
                                    value={this.state.playerInfo.foot}
                                    onChange={this.handleChange}
                                    disabled={this.state.formSubmitStatus}
                                >
                                    <option value="">Select</option>
                                    <option value="l">Left</option>
                                    <option value="r">Right</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            <div className="col-half">
                                <h5>Playing Position</h5>
                                <select
                                    name="position"
                                    value={this.state.playerInfo.position}
                                    onChange={this.handleChange}
                                    disabled={this.state.formSubmitStatus}
                                >
                                    <option value="">Select</option>
                                    <option value="def">Defence</option>
                                    <option value="mid">Midfield</option>
                                    <option value="att">Attack</option>
                                    <option value="gk">GK</option>
                                </select>
                            </div>
                        </div>    
                    </div>
                    <div className="row">
                        <h4>Photo</h4>
                        <div className="input-group">
                            <input
                                type="file"
                                accept="image/*"
                                name="photo"
                                placeholder="Upload your latest photo"
                                onChange={this.handleChange}
                                disabled={this.state.formSubmitStatus}
                            />
                        </div>
                        <div className={this.state.upload.uploadStatus ? `has-success` : 'has-error'}>{this.state.upload.uploadMessage}</div>   
                    </div>

                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 center-align">
                            <button type="button"
                                className="btn btn-md btn-primary"
                                onClick={this.handleUpload}
                                disabled={this.state.formSubmitStatus}
                            >
                                Upload
                            </button>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-3">
                            <button type="button"
                                className="btn btn-lg btn-primary"
                                disabled = {!this.state.formValidation.formValid || this.state.formSubmitStatus}
                                onClick= {this.handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        <div className="col-md-3">
                            <button type="reset"
                                className="btn btn-lg btn-primary"
                                onClick={this.clearFields}
                                disabled={this.state.formSubmitStatus}
                            >
                                Reset
                            </button>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </form>
                {this.state.formSubmitStatus && 
                    <div className="row has-success">
                        Congratulations! You are successfully registered
                        Take out your football boots and get ready to give your best
                        </div>
                }
            </div>  
        );
    }
}

export default RegisterPlayer;