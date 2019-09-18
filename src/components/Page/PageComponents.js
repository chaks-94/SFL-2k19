import * as React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Register from "../Register/register";
import Home from "../Home/home";
import Contact from "../Contact/contact";
import About from "../About/about";
import PlayersList from '../PlayersList/PlayersList';
import AdminLanding from "../Admin/Admin";

class PageComponents extends React.Component {
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
            <Route exact path="/login" component={AdminLanding} />
        </Switch>   
        )
    }
}

export default PageComponents;