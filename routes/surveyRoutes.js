const _  = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const SurveyBodyTemplate = mongoose.model('surveyBodyTemplates');

module.exports = app => {
   
   app.get('/api/surveys', requireLogin, async (req, res) => {
     const surveys = await Survey.find({_user: req.user.id})
        .select({recipients: 0 })
     res.send(surveys);
   });
   
   app.get('/api/surveys/:surveyId/:choice/preview/:surveybody', (req, res) => {
      res.redirect('/surveys/preview/'+ req.params.surveybody );
   });

   app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice/preview/:surveybody');
      
   const events =  _.chain(req.body)  
      .map(({email, url}) => {
         const match = p.test(new URL(url).pathname);
         if(match) {
            return {email, surveyId: match.surveyId,  choice: match.choice }
         }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
          Survey.updateOne({
             _id: surveyId,
             recipients: {
                $elemMatch: { email : email, responded:false }
             }
          },{
             $inc: { [choice]: 1 },
             $set: { 'recipients.$.responded': true },
             lastResponded: new Date()
          }).exec()
       })
      .value();
      console.log(events);
      res.send({});
   });
   
   
   
   app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      console.log(req.body);
      console.log('user1', req.user);
      const { title, subject, body, recipients }  = req.body;
      
      console.log(body);

      const surveyTemplateModel = await SurveyBodyTemplate.findOne({name: body});
      
      console.log(surveyTemplateModel);
      
       const survey = new Survey({
          title,
          subject,
          body: surveyTemplateModel.id,
          recipients: recipients.split(',').map(email => ({email:  email.trim()})),
          _user: req.user.id,
          dateSent: Date.now()
       });
       
       //Great place to send an email!
       const mailer = new Mailer(survey, surveyTemplate(survey));
       try {
          await mailer.send();
          await survey.save();
          req.user.credits -=1;
          const user = await req.user.save();

          res.send(user);
       } catch(err) {
          res.status(422).send(err);
       }
       
   });
   
};