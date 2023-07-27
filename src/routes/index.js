var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const searchQuery = req.query.searchQuery
  console.log(searchQuery)
  res.render('index', { title: 'Express', evenimente: true});
});

/* GET Fise de lucru page. */
router.get('/fise-de-lucru', (req, res, next) => {
  // TODO change index with the name of the ejs file
  res.render('index', { title: 'Fise de lucru', fiseDeLucru: true})
})

module.exports = router;
