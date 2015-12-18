var data = [33,14,18,20,45,35,16,35,1,13,18,13,50,44,48,6,24,41,30,42];
var counters = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf, 0);

data.sort(function(a, b){return b - a});

findCombinations(150, 0, 1);
console.log(counters.reduce(function(t,v){return t+v}, 0), counters.find(function(v){return v != 0}));

function findCombinations(liters, pos, depth){
 for(var i=pos; i<data.length; i++){
  if(data[i] == liters){
   counters[depth]++;
  } else if(data[i] < liters){
   findCombinations(liters - data[i], i+1, depth+1);
  }
 }
};