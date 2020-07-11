import React, {Component} from 'react';
import {Card,CardImg,CardBody,CardTitle,CardText} from 'reactstrap'
class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    renderComments(comments) {
        return comments.map(comment => (
            <ul key={comment.id} className='list-unstyled'>
                <li className='mb-2'>{comment.comment}</li>
                <li>
                    -- {comment.author}{", "}
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </li>
            </ul>
        ));
    }
    render() {
        if(this.props.dish === null) {
            return(
                <div></div>
                );
        }
        else {
            return (
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish.comments)}
                    </div>  
                </div>
            );
        }
    }
}
export default DishDetail;