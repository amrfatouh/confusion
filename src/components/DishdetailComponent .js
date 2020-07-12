import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const DishDetail = ({ dish }) => {
    const comments = dish.comments.map((eachComment) => {
        return(
            <ul className="list-unstyled">
                <li>{eachComment.comment}</li>
                <li>-- {eachComment.author}, {eachComment.date}</li>
            </ul>
        )
    })
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                <h3>Comments</h3>
                {comments}
            </div>
        </div>
    )
}

export default DishDetail