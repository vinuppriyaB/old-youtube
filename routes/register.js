var express = require('express');
var router = express.Router();
var registerModule=require("../module/registerModule.js")

/* GET home page. */
router.post('/signup',registerModule.signup );
router.post('/signin',registerModule.signin );
router.post('/addchannel',registerModule.addchannel);
router.put('/checkforsubscription',registerModule.checkforsubscription);
router.put('/unsubscribechannel',registerModule.unsubscribechannel);
router.get('/getsubscribechannel/:email',registerModule.getsubscribechannel);

module.exports = router;
