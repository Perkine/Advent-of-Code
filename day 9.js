var data = 'AlphaCentauri to Snowdin = 66|AlphaCentauri to Tambi = 28|AlphaCentauri to Faerun = 60|AlphaCentauri to Norrath = 34|AlphaCentauri to Straylight = 34|AlphaCentauri to Tristram = 3|AlphaCentauri to Arbre = 108|Snowdin to Tambi = 22|Snowdin to Faerun = 12|Snowdin to Norrath = 91|Snowdin to Straylight = 121|Snowdin to Tristram = 111|Snowdin to Arbre = 71|Tambi to Faerun = 39|Tambi to Norrath = 113|Tambi to Straylight = 130|Tambi to Tristram = 35|Tambi to Arbre = 40|Faerun to Norrath = 63|Faerun to Straylight = 21|Faerun to Tristram = 57|Faerun to Arbre = 83|Norrath to Straylight = 9|Norrath to Tristram = 50|Norrath to Arbre = 60|Straylight to Tristram = 27|Straylight to Arbre = 81|Tristram to Arbre = 90';
data = data.split('|');

var roads = {};
data.forEach(parseRoutes);
var places = Object.keys(roads);

var routes = places.reduce(permute, []);

var distances = routes.map(function(route){return route.reduce(function(total, value, index, array){
  return total += array[index+1] ? roads[value][array[index+1]] : 0;
 }, 0);
});

var short = Math.min.apply(Math, distances);
var long = Math.max.apply(Math, distances);

console.log('Shortest:', short, 'Longest:', long)

function parseRoutes(route){
 function makeRoad(from, to, distance) {
  function addRoad(from, to) {
   if(!(from in roads)){
    roads[from] = {};
   }
   roads[from][to] = parseInt(distance);
  };
  addRoad(from, to);
  addRoad(to, from);
 };
 route = route.split(/ to | = /g);
 makeRoad.apply(null, route);
};

function permute(res, item, key, arr) {
 return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
};