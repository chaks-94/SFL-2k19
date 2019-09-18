import React from 'react';
import { 
    BrowserRouter as Router
} from 'react-router-dom';
import Navigation from './Navigation/navigation';
import PageComponents from "./Page/PageComponents";



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

    onLogin = (userDetails) => {
        this.setState({
            userInfo: {
                userDetails,
                isAdmin:true,
            }
        })
    }
    render() {
        const {userInfo} = this.state;
        return ( 
            <Router>
                <Navigation userInfo={userInfo} />
                <PageComponents userInfo={userInfo} onLogin={this.onLogin}/>
            </Router>
        )
    }
};
export default App;