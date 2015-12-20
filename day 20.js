var data = 34000000;

for(var i=1; true; i++){
 if(calcA(i) > data)
  break;
}
console.log(i);

for(var i=1; true; i++){
 if(calcB(i) > data)
  break;
}
console.log(i);

function sum(a, b){
 return a+b;
};

function calcA(num) {
 var A = [];
 var B = [];
 var t = ~~(Math.sqrt(num));
 for(var i=1; i<=t; i++){
  if(num%i == 0){
   A.push(i);
   if(i*i != num){
    B.push(num / i);
   }
  }
 }
 return 10 * A.concat(B).reduce(sum ,0);
};

function calcB(num) {
 var A = [];
 var B = [];
 var t = ~~(Math.sqrt(num));
 for(var i=1; i<=t; i++) {
  if(num%i == 0 && i*num < 50*num){
   A.push(i);
   if(i*i != num){
    B.push(num / i);
   }
  }
 }
 return 11 * A.concat(B).reduce(sum, 0);
};

/**************************************** SLOW !!!
function calc(num){
 var r = 0;
 var t = Math.floor(Math.sqrt(num));
 for(var i=0; i<=t; i++){
  if(num%i == 0){
   x +=  i;
   if(i*i != num){
    r += num / i;
   }
  }
 }
 return 10 * r;
}
*****************************************/