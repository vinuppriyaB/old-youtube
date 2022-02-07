var express=require("express");
var router = express.Router();
var channelModule=require("../module/channelModule");

router.post("/",channelModule.postchannel);
router.post("/postvideo",channelModule.postvideo);

router.get('/search1/:channelName',channelModule.searchchannel );
router.get('/search/:email',channelModule.searchCurrentUserChannel );
router.get('/getvideos',channelModule.allchannel );
router.get('/watchvideo/:id',channelModule.watchvideo);
router.put('/updateLike',channelModule.updateLike);
router.put('/updatesubcription',channelModule.updatesubcription);
router.post('/postcomment',channelModule.postcomment);
router.get('/getcomment/:id',channelModule.getcomment);
router.get('/getreply/:id1/:id2',channelModule.getreply);
router.post('/postreply',channelModule.postreply);
router.put('/updateCommentLike',channelModule.updateCommentLike);

router.put('/updatedisLike',channelModule.updatedisLike);
router.put('/updateview',channelModule.updateview);




module.exports = router;
