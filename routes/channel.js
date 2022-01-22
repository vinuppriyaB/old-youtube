var express=require("express");
var router = express.Router();
var channelModule=require("../module/channelModule");

router.post("/",channelModule.postchannel);
router.post("/postvideo",channelModule.postvideo);
router.get('/search1/:channelName',channelModule.searchchannel );
router.get('/getvideos',channelModule.allchannel );
router.get('/watchvideo/:id',channelModule.watchvideo);
router.put('/updateLike',channelModule.updateLike);




module.exports = router;
