import * as React from "react";
import "./Admin.scss";
import {Redirect} from "react-router-dom";
import AuthenticationService from "../../services/authServices";

class AdminLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: "",
                password: "",
            },
            formValidation: {
                errors: {
                    email: "",
                    password: "",
                },
                password: false,
                email: false,
                formValid: false,
            },
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const {state} = this;
        this.setState({
            ...state,
            form: {
                ...state.form,
                [name]: value,
            }
        },() => {
            this.validateFields(name,value);
        });
    }

    validateFields = (fieldName, value) => {
        let {
            errors,
            email,
            password,
        } = this.state.formValidation;
        const {state} = this;
        switch(fieldName) {
            case "email": 
                email = value.length > 0 && /[^@]+@[^.]+\..+/g.test(value);
                errors.email = email ? "" : "Enter valid email"
                break;
            case "password" :
                password = value.length > 6;
                errors.password = password ? "" : "Password should be more than 6 Characters"
                break;
            default:
                break;
        }
        this.setState({
            ...state,
            formValidation: {
                ...state.formValidation,
                errors,
                email,
                password
            }
        },
        this.validateForm);
    }

    validateForm = () => {
        const {email,password} = this.state.formValidation;
        this.setState({
            ...this.state,
            formValidation: {
                ...this.state.formValidation,
                formValid: email && password,
            }
        })
    }

    handleLogin = () => {
        const {email,password} = this.state.form;
        const authenticationService = AuthenticationService();
        authenticationService
            .signin(email,password)
            .then((user) => {
                authenticationService.getUserDetails(user.user)
                    .then((userDetails) => {
                        this.props.onLogin(userDetails);
                    })
            })
            .catch((error) => {
                console.log(error.message);
            })


    }

    resetFields = () => {
        this.setState({
            form: {
                email: "",
                password: "",
            },
            formValidation: {
                errors: {
                    email: "",
                    password: "",
                },
                password: false,
                email: false,
                formValid: false,
            }
        })
    }

    render() {
        if(this.props.isAdmin) {
            return <Redirect to="/players" />
        }
        return (
            <div className="admin-landing-container">
                <h1>
                    Login
                </h1>
                <div className="form-group">
                    <div className="input-group input-group--email">
                        <input
                            className="input-field input-field--email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                            required
                        />
                        <label className="input-label" htmlFor="email">Email</label>
                    </div>
                    <div className="input-group input-group--password">
                        <input
                            className="input-field input-field--password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Enter Password"
                            onChange={this.handleChange}
                            value={this.state.form.password}
                            required
                        />
                        <label className="input-label" htmlFor="password">Enter Password</label>
                    </div>
                    <div className="submit-form">
                        <button 
                            type="button"
                            onClick={this.handleLogin}
                            disabled={!this.state.formValidation.formValid}
                            className="btn btn-primary btn-md"
                        > 
                            Login
                        </button>
                        <button
                            type="reset"
                            onClick={this.resetFields}
                            className="btn btn-primary btn-md"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLanding;