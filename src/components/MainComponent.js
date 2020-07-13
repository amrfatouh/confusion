import React, { Component } from 'react';
import '../App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes';

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
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                    selectedDish={this.state.dishes.find((dish) => dish.id === this.state.selectedDishId )} />
            </div>
        );
    }
}

export default Main;
