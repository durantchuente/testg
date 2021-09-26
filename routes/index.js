var express = require('express');
var router = express.Router();
let _api=require('./api')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/api', _api)

module.exports = router;
