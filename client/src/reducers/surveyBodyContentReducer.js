import {FETCH_SURVEY_CONTENT_BY_ID} from "../actions/types";


export default function (state = [], action) {
   switch (action.type) {
      case FETCH_SURVEY_CONTENT_BY_ID :
         return action.payload;
      default:
         return state;
   }
}