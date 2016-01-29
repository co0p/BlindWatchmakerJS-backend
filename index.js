var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8888;
app.use(bodyParser.json());


app.post('/sort', function(request, response){
    var hrStart, hrEnd;
    var data = request.body;
    var config = request.query;
    var repetitions = request.query.repeat || 1000;
    var details = request.query.details;
    var timings = [];
    var timingAvg = -1;

    // inform user about missing data
    if (!data || !Array.isArray(data)) {
        response.status(400);
        response.send('Please provide an array to sort');
        return;
    }

    // do the experiment
    for (var i=0; i < repetitions; i++) {
        hrStart = process.hrtime();
        data.sort();
        hrEnd = process.hrtime(hrStart);

        // hrEnd[0] -> seconds, hrEnd[1] -> ns
        timings.push(hrEnd[0]*1000 + hrEnd[1]/1000000);
    }


    timings.sort();
    var timingSum = timings.reduce(function(a, b) { return a + b; });
    var timingAvg = timingSum / timings.length;

    var result = {
        repetitions: repetitions,
        timingMin: timings[0],
        timingMax: timings[repetitions-1],
        timingAvg: timingAvg
    };

    if (details) {
        result.data = data;
        result.timings = timings;
    }

    response.send(result);
});

app.listen(port);