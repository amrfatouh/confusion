import React, { Component } from 'react';
import '../App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDishId: null
        }
    }

    onDishSelect (dishId) {
        this.setState({
            selectedDishId: dishId
        });
    };

    render() {
        return (
            <div className="App">
                <Header />
                <Menu dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                    selectedDish={this.state.dishes.find((dish) => dish.id === this.state.selectedDishId )} />
                <Footer />
            </div>
        );
    }
}

export default Main;
