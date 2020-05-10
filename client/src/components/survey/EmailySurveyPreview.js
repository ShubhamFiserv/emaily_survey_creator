import React, {Component} from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { connect } from 'react-redux';
import {fetchSurveyBodyTemplateById} from "../../actions";

class EmailySurveyPreview extends Component {

   componentDidMount() {
      this.props.fetchSurveyBodyTemplateById(this.props.match.params.id);
   }


   //Define a callback methods on survey complete
   onComplete(survey, options) {
      //Write survey results into database
      console.log("Survey results: " + JSON.stringify(survey.data));
   }
   render() {
      //Create the model and pass it into react Survey component
      //You may create survey model outside the render function and use it in your App or component
      //The most model properties are reactive, on their change the component will change UI when needed.
      var model = new Survey.Model(this.props.surveyBodyContent);
      return (<Survey.Survey model={model} onComplete={this.onComplete}/>);
      /*
      //The alternative way. react Survey component will create survey model internally
      return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
      */
      //You may pass model properties directly into component or set it into model
      // <Survey.Survey model={model} mode="display"/>
      //or 
      // model.mode="display"
      // <Survey.Survey model={model}/>
      // You may change model properties outside render function. 
      //If needed react Survey Component will change its behavior and change UI.
   }
}

function mapStateToProps({ surveyBodyContent }) {
   return {surveyBodyContent}
}

export default connect(mapStateToProps, {fetchSurveyBodyTemplateById})(EmailySurveyPreview);