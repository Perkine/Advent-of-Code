var data = '1113222113';
var times = 40;

for(var i=0; i<times; i++){
 data = lookAndSay(data);
};

console.log(data.length);

function lookAndSay(string){
 var re = /(\d)\1*/g;
 var f = function(a,b){return a.length + b};
 return data.replace(re, f);
};