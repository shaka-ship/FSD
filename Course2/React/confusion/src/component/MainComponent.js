import React, {Component} from 'react';

import Menu from './menuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { postComment, fetchDishes,fetchComments, fetchPromos, fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
const mapStateToProps = state => {
   return {
     dishes: state.dishes,
     comments: state.comments,
     promotions: state.promotions,
     leaders: state.leaders
   }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch
    (postComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch
    (postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {
  constructor(props) {
    super(props);

  }  
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            dishesLoading={this.props.dishes.dishesLoading}
            dishesErrMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            />
      );
    };
    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.dishesLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promotions.promosLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.leadersLoading}
                leadersErrMess={this.props.leaders.errMess}
            />
        );
      };
    return (
    <div className="App">
        <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path='/contactus' component={() => <Contact 
                resetFeedbackForm={this.props.resetFeedbackForm} 
                postFeedback={this.props.postFeedback} 
              />} />
              <Redirect to="/home" />
            </Switch>
        <Footer/>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
