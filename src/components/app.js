import React from 'react';
import { 
    BrowserRouter as Router,
} from 'react-router-dom';
import Navigation from './Navigation/navigation';
import PageComponents from "./Page/PageComponents";
import AuthenticationService from '../services/authServices';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : {
                userDetails: {},
                isAdmin: false,
            }
        };
    }

    componentDidMount() {
        console.log("Hello from App");
        const authService = AuthenticationService();
        authService.checkLogin()
                    .then((user) => {
                        authService.getUserDetails(user)
                            .then((userDetails) => {
                                this.setState({
                                    userInfo: {
                                        userDetails,
                                        isAdmin: true,
                                    }
                                })
                            })
                            .catch((error) => {
                                console.log("error ",error);
                                this.setState({
                                    userInfo: {
                                        userDetails : {},
                                        isAdmin: false,
                                    }
                                })
                            })
                    }).catch(() => {
                        console.log("Not logged in");
                    })
    }

    onLogin = (userDetails) => {
        this.setState({
            userInfo: {
                userDetails,
                isAdmin:true,
            }
        },this.redirectToListPage);
    }

    onLogout = () => {
        AuthenticationService()
            .signOut()
            .then((message) =>{
                if(message === "success") {
                    this.setState({
                        userInfo: {
                            userDetails :{},
                            isAdmin: false,
                        }
                    })
                }
            })
    }

    render() {
        const {userInfo} = this.state;
        return ( 
            <Router>
                <Navigation userInfo={userInfo} onLogout ={this.onLogout} />
                <PageComponents isAdmin={userInfo.isAdmin} onLogin={this.onLogin}/>
            </Router>
        )
    }
};
export default App;