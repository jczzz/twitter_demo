var router = require('express').Router();
//引入Post model
var Post_model = require('../models/post_model');



//处理http GET 请求
router.get('/', function (req, res, next) {
  //调用Mongodb里的 find()操作 sort()操作 exec()操作
  Post_model.find()
  .sort('-date')
  .exec(function (err, posts) {
    if (err) { return next(err) };
    res.json(posts);
  });
});

router.post('/', function (req, res, next) {
  // 接收post request object
  //create an instance of Post model
  // create a document
  var post = new Post_model({
    username: req.body.username,
    body:     req.body.body,
  });
  //调用mongodb的save()操作 save the document  
  post.save(function (err, post) {
    if (err) { return next(err) };
    //保存成功后，发回成功信息，返回该post document
    res.status(201).json(post);
  });
});

module.exports = router;
