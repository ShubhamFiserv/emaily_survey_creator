const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const SurveyBodyTemplate = mongoose.model('surveyBodyTemplates');


module.exports = (app) => {
   
   app.get('/api/surveyTemplate', requireLogin, async (req, res) => {
      const surveyTemplates = await SurveyBodyTemplate.find({_user: req.user.id});
      res.send(surveyTemplates);
   });

   app.get('/api/surveyTemplate/:templateId', async (req, res) => {
      console.log(req.params.templateId);
      const surveyTemplate = await SurveyBodyTemplate.findOne({_id: req.params.templateId});
      res.send(surveyTemplate.content);
   });
   
   app.post('/api/surveyTemplate',  requireLogin, async (req, res) => {
      const { name, content }  = req.body;
      const surveyBodyTemplate = new SurveyBodyTemplate({
         name,
         content,
        _user: req.user.id
      });
      try {
         await surveyBodyTemplate.save();
         req.user.credits -=1;
         const user = await req.user.save();
         res.send(user);
      } catch(err) {
         res.status(422).send(err);
      }
   });
   
};