import React, {Component} from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import { connect } from 'react-redux';
import {showSurveyBodyTemplates} from "../../actions";

class SurveySelectField extends Component {
   

   componentDidMount() {
      // this code is specifically to show dropdown required if using materialize.css
      document.addEventListener('DOMContentLoaded', function() {
         var elems = document.querySelectorAll('select');
         M.FormSelect.init(elems);
      });
      
      this.props.showSurveyBodyTemplates();
   }
   
   renderOptions(){
      return this.props.surveyTemplates.reverse().map(surveyTemplate => {
         return (
            <option key={surveyTemplate._id} value={surveyTemplate.name}>{surveyTemplate.name}</option>
         )
      });

     
   }
   
   render() {
      const { input , label, meta:{ error, touched} } = this.props;
      return (
         <div>
            <label>{label}</label>
            <select {...input}  className="browser-default" >
               {this.renderOptions()}
            </select>
            <div className="red-text" style={{marginBottom: '20px'}}>
               {touched && error}
            </div>
         </div>
      )
   }
   
};
function mapStateToProps({ surveyTemplates }) {
   return {surveyTemplates}
}


export default connect(mapStateToProps, {showSurveyBodyTemplates} )(SurveySelectField);