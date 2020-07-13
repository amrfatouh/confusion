import React from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent '

function Menu({ dishes, onClick, selectedDish }) {

    function renderDish(dish) {
        if (dish != null) {
            return (
                <DishDetail dish={dish} />
            );
        } else {
            return (<div></div>);
        }
    };

    function RenderMenuItem({ dish, onClick }) {
        return (
            <Card key={dish.id} onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        )
    }

    const menu = dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onClick={onClick} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
            {renderDish(selectedDish)}
        </div>
    )
}

export default Menu