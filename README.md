

### Application Overview
You will also need to include a README.md file with your project that discusses how you used the library in your project.  This should clearly call out the features of the library you used.  The best way to do this is with code snippets and/or screen shots. You can include HTML tags in your README.md file to add images, just make sure to upload those images to GitHub with your project.  Code highlighting can be done as described in [GitHub Help - Creating and highlighting code blocks ](https://help.github.com/articles/creating-and-highlighting-code-blocks/).


The JSCharts library is very easy to use.  It makes multiple types of graphs and allows for easy customization.  

I made three different types of charts in this project.  Bar graphs, pie graphs, and line graphs.

Almost all of the actual set up is done via Javascript.  The HTML that is required is that you have a unique DIV inserted, which is where the chart will reside.

An example of the HTML is:

'''
<div id="chartcontainer"></div>
'''

This is the first chart (bar) that is in the page.  The actual building of the chart occurs in the Javascript here:

'''
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
'''

As you can see here I built an array with two sets of data.  One is for the Y Axis and one is for the data in the graph.

I also added a lot of customization to this graph.  As you can see you can set almost anything in the chart using the customization functions that are built in.  
I was able to set a title, title color, size, names of the axises, and background color.  

In order to add a pie graph the library requires you to put in the following code

'''
                <JSChart>
                    <dataset type="pie">
                    </dataset>
                </JSChart>
'''

A pie graph is the only one that requires you to put in the JSChart HTML brackets.  

The rest of the HTML is similar to the first, in which you just provide a DIV and a unique ID.

There are two unique ways to get data for the charts and I have used both.  

The first is making a custom array in the Javascript, and the second is by reading it from a JSON or XML file.  I have chosen to use JSON files for these examples.

To read from a JSON file you need to add the following code

'''
    let myChart4 = new JSChart('chartcontainer4', 'line');
    myChart4.setDataJSON('data2.json');
'''

The library is very good in the fact that as long as your JSON is formatted correctly, it will parse it out correctly without anything further than just setting the file as the data set.  

One of the files (data2.json) even uses two separate datasets inside of the JSON file and it still parses perfectly into the graph.  Only line graphs are able to use this functionality with multiple datasets.
