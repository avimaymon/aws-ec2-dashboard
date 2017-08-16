//var request = require('request');
var ondemandList = require('../onDemand.json');
exports.getJSONOnDemandPrices = function getJSONOnDemandPrices(IT, OS,callback) {
    //     request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/index.json', 
    //     function (error, response, body) {
    //   if (!error && response.statusCode == 200) {           //This option is very slow because of 
    //      var importedJSON = JSON.parse(body);               //the jSON file size is ~125MB
    //      console.log(importedJSON);                         //I chose to download it manualy and filter it
    //   }                                                     //so all data is relevant
    // })                                                      //if there is a better option i would love to know
    let price;
    let finished = false;
    
    if (OS == 'Windows (Amazon VPC)')             //fixing differences in naming
        OS = 'Windows';
    else if (OS == 'Linux/UNIX' || OS == 'Linux/UNIX (Amazon VPC)')
        OS = 'Linux';
    else if (OS == 'SUSE Linux' || OS == 'SUSE Linux (Amazon VPC)')
        OS = 'SUSE';
    for (let i = 0; i < ondemandList.length &&!finished; i++) 
        {
        if (ondemandList[i].InstanceType == IT && ondemandList[i].OperationSystem == OS) {
            price = ondemandList[i].Price;
            finished = true;
        }
    }

    return callback(price);

}