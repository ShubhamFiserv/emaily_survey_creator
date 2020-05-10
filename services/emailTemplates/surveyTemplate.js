const keys = require('../../config/keys');

module.exports = (survey) => {
   return `
      <html>
            <body>
               <div style="text-align: center;">
                 <h3>I'd like your input!</h3>
                 <p>Please answer the following question:</p>
                 <p>Please fill this survey for review</p>
                 <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes/preview/${survey.body}">Click To Open This Survey</a>  
                 <div>
               </div>
            </body>
      </html>
   `;
};