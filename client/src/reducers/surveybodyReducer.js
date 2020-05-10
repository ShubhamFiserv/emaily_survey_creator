import {SHOW_SURVEY_BODY} from "../actions/types";


export default function (state = [], action) {
   switch (action.type) {
      case SHOW_SURVEY_BODY :
         return action.payload;
      default:
         return state;
   }
}