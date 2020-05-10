import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from "./surveysReducer";
import surveybodyReducer from "./surveybodyReducer";
import surveyBodyContentReducer from "./surveyBodyContentReducer";

export default combineReducers({
   auth: authReducer,
   form: reduxForm,
   surveys: surveysReducer,
   surveyTemplates: surveybodyReducer,
   surveyBodyContent: surveyBodyContentReducer
})