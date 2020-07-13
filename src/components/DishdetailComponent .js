import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({ comments }) {
    const renderedComments = comments.map((eachComment) => {
        return (
            <ul className="list-unstyled">
                <li>{eachComment.comment}</li>
                <li>-- {eachComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(eachComment.date)))}</li>
            </ul>
        )
    })
    return (
        <div>
            <h3>Comments</h3>
            {renderedComments}
        </div>
    )
}

const DishDetail = ({ dish }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={dish.comments}/>
            </div>
        </div>
    )
}

export default DishDetail