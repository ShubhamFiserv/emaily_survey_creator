const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveyBodyTemplateSchema = new Schema({
   name: String,
   content: String,
   _user:  {type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('surveyBodyTemplates', surveyBodyTemplateSchema);

