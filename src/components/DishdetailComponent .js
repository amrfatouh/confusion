import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor (props) {
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
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
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
                                }}/>
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
                                <Control.textarea model='.comment' rows='6' id='comment' className="form-control"/>
                            </FormGroup>
                            <Button color='primary' className='mt-3'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

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

function RenderComments({ comments, dishId, addComment }) {
    const renderedComments = comments.map((eachComment) => {
        return (
            <ul className="list-unstyled" key={eachComment.id}>
                <li>{eachComment.comment}</li>
                <li>-- {eachComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(eachComment.date)))}</li>
                
            </ul>
        )
    })
    return (
        <div>
            <h3>Comments</h3>
            {renderedComments}
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

const DishDetail = ({ dish, comments, addComment }) => {
    if(dish != null && comments != null) {
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
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} dishId={dish.id} addComment={addComment} />
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