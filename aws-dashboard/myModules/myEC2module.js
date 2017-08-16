//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
exports.RequestSpotPriceHistory = function RequestSpotPriceHistory(AZ, IT, OS, callback) {
  var AWS = require('aws-sdk');
  AWS.config = new AWS.Config();  //creating config file for modoule instance

  AWS.config.loadFromPath('./config.json'); //updating accessKeyId,secretAccessKey and region from config.json
  var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });    //creating ec2 instance
  var startTime = new Date();     //Creating startTime and decreasing 14 days
  startTime.setDate(startTime.getDate() - 14);  // from current date

  var params = {
    AvailabilityZone: AZ, //PASSED TO FUNCTION
    DryRun: false,
    EndTime: new Date(),
    InstanceTypes: [
      IT      //PASSED TO FUNCTION

    ],
    MaxResults: 1000,     // MAXIMUM VALUE - 1000
    NextToken: '',
    ProductDescriptions: [
      OS              //PASSED TO FUNCTION

    ],
    //new Date('2017-05-10')
    StartTime: startTime
  };

  var returnedData;
  ec2.describeSpotPriceHistory(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      returnedData = JSON.stringify(data.SpotPriceHistory);
      if (data.NextToken != '')      //CHECK IF THERES ANY RECORDS LEFT TO FETCH - THE NEXT SET
      {
        params.NextToken = data.NextToken;
        ec2.describeSpotPriceHistory(params, function (err, data1) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            var tmp1 = JSON.stringify(data.SpotPriceHistory).slice(0, -1) + ',' + JSON.stringify(data1.SpotPriceHistory).substr(1);
            try {
              returnedData = JSON.parse(tmp1);
            }
            catch (error) {
              console.log(error);
            }
          }
        });
      }
      return callback(returnedData);
    }
  });
}

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
exports.getAvailabilityZones = function getAvailabilityZones(callback) {
  var AWS = require('aws-sdk');
  AWS.config = new AWS.Config();  //creating config file for modoule instance

  AWS.config.loadFromPath('./config.json'); //updating accessKeyId,secretAccessKey and region from config.json
  var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });    //creating ec2 instance

  var params = {
    DryRun: false
  };
  ec2.describeAvailabilityZones(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var azArr = [];
    for(let i=0;i<data.AvailabilityZones.length-1;i++)
      {
        azArr[i] =  data.AvailabilityZones[i].ZoneName;
      }
    return callback(azArr);
    }
  });
}
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
exports.getInstanceTypes = function getInstanceTypes()  //HARD CODED, there's no such function on the API
{
  var itList = ['t1.micro', 't2.nano', 't2.micro', 't2.small', 't2.medium', 't2.large', 't2.xlarge',
    't2.2xlarge', 'm1.small', 'm1.medium', 'm1.large', 'm1.xlarge', 'm3.medium',
    'm3.large', 'm3.xlarge', 'm3.2xlarge', 'm4.large', 'm4.xlarge', 'm4.2xlarge', 'm4.4xlarge',
    'm4.10xlarge', 'm4.16xlarge', 'm2.xlarge', 'm2.2xlarge', 'm2.4xlarge', 'cr1.8xlarge '
    , 'r3.large', 'r3.xlarge', 'r3.2xlarge', 'r3.4xlarge', 'r3.8xlarge', 'r4.large', 'r4.xlarge',
    'r4.2xlarge', 'r4.4xlarge', 'r4.8xlarge', 'r4.16xlarge', 'x1.16xlarge', 'x1.32xlarge'
    , 'i2.xlarge', 'i2.2xlarge', 'i2.4xlarge', 'i2.8xlarge', 'i3.large', 'i3.xlarge', 'i3.2xlarge'
    , 'i3.4xlarge', 'i3.8xlarge', 'i3.16xlarge', 'hi1.4xlarge', 'hs1.8xlarge', 'c1.medium',
    'c1.xlarge', 'c3.large', 'c3.xlarge', 'c3.2xlarge', 'c3.4xlarge', 'c3.8xlarge', 'c4.large',
    'c4.xlarge', 'c4.2xlarge', 'c4.4xlarge', 'c4.8xlarge', 'cc1.4xlarge', 'cc2.8xlarge',
    'g2.2xlarge', 'g2.8xlarge', 'g3.4xlarge', 'g3.8xlarge', 'g3.16xlarge', 'cg1.4xlarge', 'p2.xlarge'
    , 'p2.8xlarge', 'p2.16xlarge', 'd2.xlarge', 'd2.2xlarge', 'd2.4xlarge', 'd2.8xlarge', 'f1.2xlarge', 'f1.16xlarge'];
  return itList;
}

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
exports.getProductDescriptions = function getInstanceTypes()  //HARD CODED, there's no such function on the API
{
  var osList = ['Linux/UNIX', 'SUSE Linux', 'Windows', 'Linux/UNIX (Amazon VPC)',
    'SUSE Linux (Amazon VPC)', 'Windows (Amazon VPC)'];
  return osList;
}


