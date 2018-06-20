## New York Felony Occurrence Visualization

### About
This project was created by Jackson Quinn (Github: jackson-quinn) and I as part of our Data Visualization class (CMSC 23900). With this project, we aimed to take a closer look at crime within NYC; on a macro-level, it is easy to see that the city as a whole has gotten significantly safer over the year. However, we wished to examine data on a precinct-by-precinct basis, hoping to find out whether crime is fundamentally decreasing, or if it is decreasing in such a way that it only benefits a select few.

We have acquired our data from the NYC website (linked to [here](http://www1.nyc.gov/site/nypd/stats/crime-statistics/historical.page)), and we have chosen to focus on what the NYPD describes as the "seven major" felonies. These are murder, sexual assault, robbery, felony assault, burglary, grand larceny, and grand theft auto. Our work produces an interactive visualization that allows viewers to examine data on a macro-level (using our color-map) but also on a micro-level by clicking an individual precinct during a given year. We have provided a slider at the bottom of the webpage to allow users to move through the years efficiently, and also an about page for some more information on the project. Annotations are provided at the top which help place the state of the city in some context.

### Pre-Processing
Inside of */data/* you can find the original data set, which we have transformed into both a *cleaned_data.csv* and an *output.json*. The file used in rendering the website is present in *precint_data_min.json*, and the annotations can be found in *annotations.json*.

### Main Code
In order to construct the map, we have used a geoJSON provided open source by another user: the link to his github and work can be found [here](https://github.com/dwillis/nyc-maps/blob/master/police_precincts.geojson). The bulk of our code can be found in */src/app.js*, with the rest being found in */about.html* and *index.html*. The rest of the files were provided to us as a scaffold to aid us in creating our visualization. I would like to note that the class gave little requirement about this project - simply to make an interactive visualization, and this is the result of that work.

To host our server, we used yarn, hence some yarn leftovers in our files.
