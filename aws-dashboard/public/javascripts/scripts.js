function hideGUI() {
    $("#myChart").hide();
    $("#noData").hide();
    $("#minMaxTable").hide();
    $("#alertDiv").hide();
    $("#chartDiv").hide();
    $("#graphHere").html('<h3>Please wait while data is retrieved...</h3>');
    
}

function createChart(ctx,myData,myLabels)
{
    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      labels: myLabels,
      datasets: [{
      label: "Price in USD/hr",
      backgroundColor: 'rgba(0, 128, 255,0.7)',
      borderColor: 'rgba(106, 0, 204,0.7)',
      data: myData
      }]
      },
      // Configuration options go here
      options: {
      legend: {
      labels: {
      // This more specific font property overrides the global property
      fontSize: 20
      }
      },
      hover:{animationDuration:1000},
      title: {
      display: true,
      text: 'Spot instances price history',
      fontSize : 30
      }  ,
      tooltips: {
      callbacks: {
      labelColor: function(tooltipItem, chart) {
      return {
      borderColor: 'rgb(255, 255, 0)',
      backgroundColor: 'rgb(0, 255, 0)'
      }
      }
      }
      },
      elements: {
      line: {
      tension: 0, // disables bezier curves
      }
      }
      }
      });
}

function splitAndHandleObject(priceHistory)
{
          let zeroCount=0
          var obj = JSON.parse(priceHistory);
          var dateArr = [];
          var priceArr = [];
          let sum=0;
          for (let i = 0 ; i<obj.length-1; i++) 
          {
          dateArr[i] = moment(obj[i].Timestamp).format('MMMM Do YYYY, h:mm:ss a');
          priceArr[i] = parseFloat(obj[i].SpotPrice,10);
          sum += priceArr[i];
          if(priceArr[i]==0)
            zeroCount++;
          }

          dateArr.reverse();    //fixing because they are retrieved reversed
          priceArr.reverse();   

          return [dateArr,priceArr,parseFloat((sum/(dateArr.length-zeroCount)),10)];
          
}
