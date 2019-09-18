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
            userDetails:{},
            isAdmin:false,
        };
    }

    onLogin = (userDetails) => {
        this.setState({
            userDetails,
            isAdmin:true,
        })
    }
    render() {
        const {userDetails,isAdmin} = this.state;
        return ( 
            <Router>
                <Navigation userDetails={userDetails} isAdmin={isAdmin} />
                <PageComponents onLogin={this.onLogin}/>
            </Router>
        )
    }
};
export default App;