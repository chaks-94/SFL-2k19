import * as React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Register from "../Register/register";
import Home from "../Home/home";
import Contact from "../Contact/contact";
import About from "../About/about";
import PlayersList from '../PlayersList/PlayersList';
import AdminLanding from "../Admin/Admin";
import Gallery from "../Gallery/gallery";
import Dashboard from "../AdminDashboard/Dashboard";
import Portal from "../AdminDashboard/ResgitrationPortal";

class PageComponents extends React.Component {

    render(){
        const {isAdmin} = this.props;
       return (
        <Switch>
            <Route
                exact
                path="/"
                render = {() =>{
                    return <Redirect exact to="home" />
                }}
            />
            <Route exact path="/home" render={() => {
                return <Home isAdmin={isAdmin} />
            }} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/players" render={() => {
                return <PlayersList isAdmin={isAdmin} />
            }} />
            <Route exact path="/login" render={() =>{
                return <AdminLanding onLogin={this.props.onLogin} isAdmin={isAdmin} />
            }} />
            <Route exact path="/gallery" render={() =>{
                return <Gallery isAdmin={isAdmin} />
            }} />
            <Route exact path="/dashboard" render={() =>{
                return <Dashboard isAdmin={isAdmin} />
            }} />
            <Route exact path="/portal" render={() =>{
                return <Portal isAdmin={isAdmin} />
            }} />
        </Switch>   
        )
    }
}

export default PageComponents;