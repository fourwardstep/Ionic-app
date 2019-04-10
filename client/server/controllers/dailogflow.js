const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');


//    dialoflow code
router.post('/dialogflow', function(req,res) {
  console.log('reached here');
  const projectId = "js-interview";
  const LANGUAGE_CODE = 'en-US';
  const sessionId = req.body.sessionId;
  var query = req.body.query;

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId,sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: LANGUAGE_CODE,
      },
    },
  };

  sessionClient.detectIntent(request).then(response => {
    console.log('intent detected');
    const result = response[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if(result.fulfillmentText) {
      console.log(result.fulfillmentText);
      return res.json({reply: result.fulfillmentText})
    }
    // if(result.intent) {
    //   console.log(`  Intent: ${result.intent.displayName}`)
    // }
    else {
      console.log('no intent found');
    }
  }).catch(err => {
    console.log('error '+err);
  })
  
});

  module.exports = router;