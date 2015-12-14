var data = 'Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.';
data = data.split('.');
data.pop();		// last entry is empty, because splitting on '.'
data = parse(data);

var reindeers = Object.keys(data);
var secs = 2503;

for(var sec=1; sec<=secs; sec++){
 pointsToLeaders(sec);
};

var distances = distancesCovered(2503);
var longestDist = Math.max.apply(Math, distances);
var mostPoints = reindeers.reduce(function(a, b){return a > data[b][3] ? a : data[b][3]}, 0);

console.log('Distance:', longestDist, 'Points:', mostPoints);

function parse(data){
 var o = {};
 data.forEach(function(value){
  var re = /(\w+)\D+(\d+)\D+(\d+)\D+(\d+)/;
  var m = value.match(re);
  o[m[1]] = [+m[2], +m[3], +m[4], 0];	// o[name] = [speed, flytime, resttime, points]
 });
 return o;
};

function distancesCovered(sec){
 var distances = reindeers.map(function(key){
  var reindeer = data[key];
  var t = reindeer[1] + reindeer[2];
  var flyTime = reindeer[1];
  var speed = reindeer[0];
  return speed * (flyTime * (Math.floor(sec / t)) + Math.min(sec % t, flyTime));
 });
 return distances;
}

function pointsToLeaders(sec){
 var distances = distancesCovered(sec);
 var max = Math.max.apply(Math, distances);

 distances.forEach(function(value, index){
  if(value == max)
   data[reindeers[index]][3]++
 });
};