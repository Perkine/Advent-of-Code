var ingredienst = {
 Sprinkles: {capacity: 5, durability: -1, flavor: 0, texture: 0, calories: 5},
 PeanutButter: {capacity: -1, durability: 3, flavor: 0, texture: 0, calories: 1},
 Frosting: {capacity: 0, durability: -1, flavor: 4, texture: 0, calories: 6},
 Sugar: {capacity: -1, durability: 0, flavor: 0, texture: 2, calories: 8}
};

var A = ingredienst.Sprinkles;
var B = ingredienst.PeanutButter;
var C = ingredienst.Frosting;
var D = ingredienst.Sugar;

var max = 100;		// 176851 is aantal herhalingscombinaties  103! / (100! * 3!) is (103!/100!) / 3! is (103 * 102 * 101) / 3!
var scores = [];
maxScore = 0;
var score;

for(var a=0; a<=max; a++){
 for(var b=0; a+b<=max; b++){
  for(var c=0; a+b+c<=max; c++){
   score = scoreIngredients(a,b,c,max-(a+b+c));
   if(score >= maxScore){
    maxScore = score;
   }
  }
 }
};

console.log('done: '+ maxScore);

function scoreIngredients(a,b,c,d){
 function calcProperty(type){
  return function(ingredient, amount){
   return amount * ingredient[type];
  };
 };

 var calories = calcProperty('calories');
 var capacity = calcProperty('capacity');
 var durability = calcProperty('durability');
 var flavor = calcProperty('flavor');
 var texture = calcProperty('texture');

 var tCalories = calories(A, a) + calories(B, b) + calories(C, c) + calories(D, d);
 if(tCalories != 500)
  return;

 var tCapacity = capacity(A, a) + capacity(B, b) + capacity(C, c) + capacity(D, d);
 var tDurability = durability(A, a) + durability(B, b) + durability(C, c) + durability(D, d);
 var tFlavor = flavor(A, a) + flavor(B, b) + flavor(C, c) + flavor(D, d);
 var tTexture = texture(A, a) + texture(B, b) + texture(C, c) + texture(D, d);

 var score = Math.max(0, tCapacity) * Math.max(0, tDurability) * Math.max(0, tFlavor) * Math.max(0, tTexture);
 if(score != 0)
  return score;
};

/*
for(var a=0; a<=max; a++){
 for(var b=0; a+b<=max; b++){
  for(var c=0; a+b+c<=max; c++){
   for(var d=max-(a+b+c); a+b+c+d<=max; d++){
    score = scoreIngredients(a,b,c,d);
    if(score >= maxScore){
     maxScore = score;
    }
   }
  }
 }
};

function permutations(num, max) {
 if(num == 1){
  return [[max]];
 }
 var res = [];
 for(var i=0; i<=max; i++){
  permutations(num-1, max-i).forEach(function(j){
   res.push(j.concat([i]));
  });
 }
 return res;
};

x = permutations(4, 100);
console.log(x.length);
*/