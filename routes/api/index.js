var express = require('express');
var router = express.Router();
let _user=require('./user')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/user', _user)

module.exports = router;
