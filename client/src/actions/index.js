import axios from 'axios';
import { FETCH_USER,  FETCH_SURVEYS, SHOW_SURVEY_BODY, FETCH_SURVEY_CONTENT_BY_ID} from "./types";

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   
   dispatch({type:FETCH_USER, payload:res.data });
};

export const handleToken = (token) => async dispatch => {
   const res  = await axios.post('/api/stripe',token);
   
   dispatch({type:FETCH_USER, payload:res.data });
};

export const submitSurvey = (values, history ) =>  async dispatch => {
    const res = await axios.post('/api/surveys',  values);
    
    history.push('/surveys');
    dispatch({type:FETCH_USER, payload:res.data });
};

export const fetchSurveys = () =>  async dispatch => {
   const res = await axios.get('/api/surveys');
   dispatch({type:FETCH_SURVEYS, payload:res.data });
};

export const saveSurveyBodyTemplate = (surveyBody, history) =>  async dispatch => {
   const res = await axios.post('/api/surveyTemplate',  surveyBody);

   dispatch({type:FETCH_USER, payload:res.data });
   
   history.push('/surveys');
};

export const showSurveyBodyTemplates = () => async dispatch => {
   const res = await axios.get('/api/surveyTemplate');
   dispatch({type:SHOW_SURVEY_BODY, payload:res.data });
};

export const fetchSurveyBodyTemplateById = (id) => async dispatch => {
   const res = await axios.get('/api/surveyTemplate/'+id);
   dispatch({type:FETCH_SURVEY_CONTENT_BY_ID, payload:res.data });
}
