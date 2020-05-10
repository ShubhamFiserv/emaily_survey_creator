import _ from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import SurveySelectField from './SurveySelectField';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'
class SurveyForm extends Component {
   renderFields(){
      return _.map(formFields, ({label, name}) => {
            if( name === 'body'){
              return ( <div key="22">
                 <div key="23">
                    <Field key={name} label={label} name={name} component={SurveySelectField} />
                 </div>
              </div> );
            } 
            return ( <Field key={name} component={SurveyField} type="text" label={label} name={name} favoriteColorValue={this.props.favoriteColorValue}/> );
      });
   }
   
   render() {
      return (
         <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
               {this.renderFields()}
               <Link to="/surveys" className="red btn-flat white-text">
                  Cancel
               </Link>
               <button type="submit" className="teal btn-flat right white-text">
                  Next
                  <i className="material-icons right">done</i>
               </button>
            </form>    
         </div> 
      );
   }
}

function validate(values) {
  const errors = {};

   errors.recipients = validateEmails(values.recipients || '');
   
  _.each(formFields, ({name})=>{
     if(!values[name]){
        errors[name] = 'You must provide a value';
     }
  });
   
  
  
  return errors;
}

SurveyForm =  reduxForm({
   validate,
   form: 'surveyForm',
   destroyOnUnmount: false,
})(SurveyForm);

export default SurveyForm;
