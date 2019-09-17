import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import Navigation from './Navigation/navigation';
import Register from "./Register/register";
import Home from "./Home/home";
import Contact from "./Contact/contact";
import About from "./About/about";
import PlayersList from './PlayersList/PlayersList';
import AdminLanding from './Admin/Admin';


const App = () => (
    <Router>
        <Navigation />
        <Redirect exact from="/" to="home" />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/players" component={PlayersList} />
        <Route exact path="/login" component={AdminLanding} />
    </Router>
);
export default App;