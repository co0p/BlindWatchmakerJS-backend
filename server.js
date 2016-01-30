var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = process.env.PORT || 8888;

app.use(bodyParser.json());


function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}


app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/sort', function(request, response){
    var hrStart, hrEnd;
    var timings = [];
    var timingAvg = -1;

    var data = request.body;
    var config = request.query || {};
    var repetitions = config.repetitions || 100;
    var details = config.details;


    // inform user about missing data
    if (!data || !Array.isArray(data)) {
        response.status(400);
        response.send('Please provide an array to sort');
        return;
    }

    // do the experiment
    for (var i=0; i < repetitions; i++) {
        hrStart = process.hrtime();
        bubbleSort(data);
        hrEnd = process.hrtime(hrStart);

        // hrEnd[0] -> seconds, hrEnd[1] -> ns
        timings.push(hrEnd[0]*1000 + hrEnd[1]/1000000);
    }


    timings.sort();
    var timingSum = timings.reduce(function(a, b) { return a + b; });
    timingAvg = timingSum / timings.length;

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
