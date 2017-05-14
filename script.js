$(document).ready(function() {
    //chart 1
    let myData = new Array(['1993', 20], ['1994', 10], ['1995', 30], ['1996', 10], ['1997', 5]);
    let myChart = new JSChart('chartcontainer', 'bar');
    myChart.setDataArray(myData);
    myChart.setBackgroundColor('#efe');
    myChart.setAxisNameX('Years');
    myChart.setAxisNameY('Millions Sold');
    myChart.setSize(700, 450);
    myChart.setTitle('Super Nintendo Sold Per Year');
    myChart.setTitleColor('#5555AA');
    myChart.setTitleFontSize(20);
    myChart.draw();
    //chart 2  
    let myChartTwo = new JSChart('chartcontainer2', 'pie');
    myChartTwo.setDataJSON('data.json');
    myChartTwo.setTitle('Console Market in 1995');
    myChartTwo.setBackgroundColor('#efe');
    myChartTwo.draw();
    //chart 3
    let myData3 = new Array([1, 25], [2, 30], [3, 45], [4, 10], [5, 15]);
    let myData4 = new Array([1, 10], [1, 5], [1, 25], [4, 20],  [5, 20]);
    let myChart3 = new JSChart('chartcontainer3', 'line');
    myChart3.setDataArray(myData3, 'Super Nintendo');
    myChart3.setDataArray(myData4, 'Sega Genesis');
    myChart3.setAxisNameX('Months');
    myChart3.setAxisNameY('Tens of Thousands Sold');
    myChart3.setTitle('Super Nintendo vs Sega Sales in 1995');
    myChart3.setBackgroundColor('#efe');
    myChart3.draw();
    //chart 4
    let myChart4 = new JSChart('chartcontainer4', 'line');
    myChart4.setDataJSON('data2.json');
    myChart4.setAxisNameX('Months');
    myChart4.setAxisNameY('Thousands Sold');
    myChart4.setTitle('Super Nintendo vs Sega Game sales in 1995');
    myChart4.setBackgroundColor('#efe');
    myChart4.draw();
});