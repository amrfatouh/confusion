import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Stagger, Fade, FadeTransform } from 'react-animation-components'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model='.rating' id='rating' className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model='.author' id='author' placeholder='Your Name' className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='comment'>Comment</Label>
                                <Control.textarea model='.comment' rows='6' id='comment' className="form-control" />
                            </FormGroup>
                            <Button color='primary' className='mt-3'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderDish({ dish, isLoading, errMess }) {
    if (isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }
    else if (dish != null) {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    }

}

function RenderComments({ comments, dishId, postComment }) {
    return (
        <div>
            <Stagger in>
                {comments.map((eachComment) => {
                    return (
                        <Fade in>
                            <ul className="list-unstyled" key={eachComment.id}>
                                <li>{eachComment.comment}</li>
                                <li>-- {eachComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(eachComment.date)))}</li>

                            </ul>
                        </Fade>
                    )
                })}
            </Stagger>
            <h3>Comments</h3>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}

const DishDetail = ({ dish, isLoading, errMess, comments, commentsErrMess, postComment }) => {
    if (comments != null && dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} isLoading={isLoading} errMess={errMess} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} dishId={dish.id} postComment={postComment} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <p>couldn't find the dish</p>
            </div>
        );
    }
}

export default DishDetail