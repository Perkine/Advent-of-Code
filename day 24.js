var data = [1,3,5,11,13,17,19,23,29,31,37,41,43,47,53,59,67,71,73,79,83,89,97,101,103,107,109,113];

data.reverse();

var total = data.reduce(sum, 0);

var find = total / 3;
var combos = [];
var minDepth = 9999;
findCombinations(data, find, 0, 1, combos, []);
combos = combos.map(function(combo){return combo.reduce(product, 1)});
console.log(Math.min.apply(Math, combos));

var find = total / 4;
var combos = [];
var minDepth = 9999;
findCombinations(data, find, 0, 1, combos, []);
combos = combos.map(function(combo){return combo.reduce(product, 1)});
console.log(Math.min.apply(Math, combos));


function sum(a, b){return a+b};
function product(a, b){return a*b};

function findCombinations(data, weight, pos, depth, combos, history, t){
 for(var i=pos; i<data.length; i++){
   t = Object.create(history)
   t.push(data[i]);
  if(data[i] == weight){
   minDepth = depth;
   combos.push(t);
  } else if(data[i] < weight && depth <= minDepth){
   findCombinations(data, weight - data[i], i+1, depth+1, combos, t);
  }
 }
};