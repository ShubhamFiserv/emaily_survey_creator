import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("modern");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class EmailySurveyCreator extends Component {
   surveyCreator;
   componentDidMount() {
      let options = { showEmbededSurveyTab: false, showJSONEditorTab: false, showTestSurveyTab: false, showPropertyGrid: false };
      this.surveyCreator = new SurveyJSCreator.SurveyCreator(
         "surveyCreatorContainer",
         options
      );
      this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
      //Show toolbox in the right container. It is shown on the left by default
      this.surveyCreator.showToolbox = "right";
      //Show property grid in the right container, combined with toolbox
      this.surveyCreator.showPropertyGrid = "right";
      //Make toolbox active by default
      this.surveyCreator.rightContainerActiveItem("toolbox");
   }
   render() {
      return <div id="surveyCreatorContainer" />;
   }
   saveMySurvey = () => {
      console.log(JSON.stringify(this.surveyCreator.text ));
      this.props.saveSurveyBodyTemplate({ name:'SurveyBodyTemplate'+ new Date().getTime(), content:this.surveyCreator.text }, this.props.history);
   };
}

export default connect(null, actions)(withRouter(EmailySurveyCreator));