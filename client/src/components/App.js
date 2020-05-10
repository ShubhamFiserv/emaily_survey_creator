import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyBuilder from './survey/SurveyBuilder';
import EmailySurveyPreview from "./survey/EmailySurveyPreview";


class App extends Component {
   
   componentDidMount() {
      this.props.fetchUser();
   }
   
   render() {
      return (
         <div className="container">
            <BrowserRouter>
               <div>
                  <Header/>
                  <Route path="/" exact component={Landing}/>
                  <Route path="/builder" exact component={SurveyBuilder}/>
                  <Route exact path="/surveys" component={Dashboard}/>
                  <Route exact path="/surveys/preview/:id" component={EmailySurveyPreview}/>
                  <Route exact path="/surveys/new" component={SurveyNew}/>
               </div>
            </BrowserRouter>
         </div>
      )
   }
};

export default connect(null, actions)(App);