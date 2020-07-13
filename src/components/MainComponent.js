import React, { Component } from 'react';
import '../App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDishId: null
        }
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDishId: dishId
        });
    };

    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
