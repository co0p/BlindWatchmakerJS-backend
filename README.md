# BlindWatchmakerJS-backend

This is a timing backend for the BlindWatchmakerJS Genetic algorithm implementation.
The backend does a sort on a given json array for n times. Just POST valid json
data to the `/sort` endpoint

## try it

Go to [https://co0p-blindwatchmaker.herokuapp.com](https://co0p-blindwatchmaker.herokuapp.com) and
try it for yourself.


## options

* `/sort` - will do the experiment with 100 repetitions and will not return details
* `/sort ? repetitions = 100` - will do 100 repetitions of the timing
* `/sort ? details = true` - will do return more details of the experiment
