import * as React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Register from "../Register/register";
import Home from "../Home/home";
import Contact from "../Contact/contact";
import About from "../About/about";
import PlayersList from '../PlayersList/PlayersList';
import AdminLanding from "../Admin/Admin";
import Gallery from "../Gallery/gallery";

class PageComponents extends React.Component {
    
    onLogin = (userDetails) => {
        this.props.onLogin(userDetails);
    }

    render(){
       return (
        <Switch>
            <Route
                exact
                path="/"
                render = {() =>{
                    return <Redirect exact to="home" />
                }}
            />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/players" component={PlayersList} />
<<<<<<< HEAD
            <Route exact path="/login" render={() =>{
                return <AdminLanding onLogin={this.onLogin} />
            }} />
=======
            <Route exact path="/gallery" component={Gallery} />
>>>>>>> app-dev
        </Switch>   
        )
    }
}

export default PageComponents;