var express = require('express');
var router = express.Router();
var myEC2module = require('../myModules/myEC2module');
var getJSONOnDemand = require('../myModules/getJSONOnDemand');
console.log('**************************App Started**************************');
console.log('Running on port 3000');
console.log('*********************Made By Avi Maymon************************');
router.get('/', function (req, res, next) {
  res.render('index');
  res.end();

});
router.post('/getPriceHistory', function (req, res, next) {
  myEC2module.RequestSpotPriceHistory(req.body.az, req.body.it, req.body.os, function (result) {
    res.send(result);
  });
});
router.post('/getOnDemandPrice', function (req, res, next) {  //TODO : change to GET
  getJSONOnDemand.getJSONOnDemandPrices(req.body.it, req.body.os, function (data) {
    res.send(data);
  });
});
router.get('/getInstanceTypes', function (req, res, next) {
  let data = myEC2module.getInstanceTypes();
    res.send(data);
});
router.get('/getProductDescriptions', function (req, res, next) {
  let data = myEC2module.getProductDescriptions();
  res.send(data);
});
router.get('/getAvailabilityZones', function (req, res, next) {
  myEC2module.getAvailabilityZones(function(data)
{
  res.send(data);
});
});

module.exports = router;
