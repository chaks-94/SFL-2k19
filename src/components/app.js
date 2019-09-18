import React from 'react';
import { 
    BrowserRouter as Router
} from 'react-router-dom';
import Navigation from './Navigation/navigation';
import PageComponents from "./Page/PageComponents";



class App extends React.Component {
    
    render() {
        return ( 
            <Router>
                <Navigation />
                <PageComponents />
            </Router>
        )
    }
};
export default App;