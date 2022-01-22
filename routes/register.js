var express = require('express');
var router = express.Router();
var registerModule=require("../module/registerModule.js")

/* GET home page. */
router.post('/signup',registerModule.signup );
router.post('/signin',registerModule.signin );

module.exports = router;
