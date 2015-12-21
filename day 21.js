// To lazy to code a parser, again.
var player = [100, 0, 0];
var boss = [109, 8, 2];

var weapons = [
 [8,4,0],
 [10,5,0],
 [25,6,0],
 [40,7,0],
 [74,8,0],
 [13,0,1]
];
var armor = [
 [0,0,0],	// ring only
 [31,0,2],
 [53,0,3],
 [75,0,4],
 [102,0,5]
];
var rings = [
 [25,1,0],
 [50,2,0],
 [100,3,0],
 [20,0,1],
 [40,0,2],
 [80,0,3]
];

var dmg = []; // fill with [dmg, cost]
var def = [];

for(var i=0; i<weapons.length; i++){
 dmg.push([weapons[i][1], weapons[i][0]]);
 dmg.push([weapons[i][1] + rings[0][1], weapons[i][0] + rings[0][0]]);
 dmg.push([weapons[i][1] + rings[1][1], weapons[i][0] + rings[1][0]]);
 dmg.push([weapons[i][1] + rings[2][1], weapons[i][0] + rings[2][0]]);
}
dmg.sort(function(a, b){
 return a[0] - b[0] || a[1] - b[1];
});

for(var i=0; i<armor.length; i++){
 def.push([armor[i][2], armor[i][0]]);
 def.push([armor[i][2] + rings[3][2], armor[i][0] + rings[3][0]]);
 def.push([armor[i][2] + rings[4][2], armor[i][0] + rings[4][0]]);
 def.push([armor[i][2] + rings[5][2], armor[i][0] + rings[5][0]]);
}
def.sort(function(a, b){
 return a[0] - b[0] || a[1] - b[1];
});

var req = 11;					// dmg + armor needed to win is 11
for(var i=0, A, B, C=[]; i<req; i++){
 A = dmg.find(function(value){return value[0] == i});	// first entry is lowest cost for this amount of dmg
 B = def.find(function(value){return value[0] == req-i});
 C.push((A ? A[1] : 9999) + (B ? B[1] : 9999));
};
console.log(Math.min.apply(Math, C));

//reverse the costs for part deux
dmg.reverse();
def.reverse();

var req = 10;						//  dmg + armor needed to lose is 10, since a weapon is mandatory and the boss dmg is 8 and armor is only 2, it's not possible to max out on armor
for(var i=4, A, B, C=[]; i<req; i++){			// i=4; 4 dmg minimum since a weapon is mandatory
 A = dmg.find(function(value){return value[0] == i});
 B = def.find(function(value){return value[0] == req-i});
 C.push((A ? A[1] : 9999) + (B ? B[1] : -9999));
};
console.log(Math.max.apply(Math, C));