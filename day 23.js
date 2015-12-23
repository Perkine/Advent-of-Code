var data = String.raw`jio a, +18
inc a
tpl a
inc a
tpl a
tpl a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
tpl a
tpl a
inc a
jmp +22
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`;

data = data.split('\n');

var reg = {a:1, b: 0};

var instructions = {
 hlf: function(ins){
  reg[ins[2]] /= 2;
  i++;
 },
 tpl: function(ins){
  reg[ins[2]] *= 3;
  i++;
 },
 inc: function(ins){
  reg[ins[2]]++;
  i++;
 },
 jmp: function(ins){
  i += parseInt(ins[2]);
 },
 jie: function(ins){
  i += (reg[ins[2]] % 2 == 0) ? parseInt(ins[3]) : 1;
 },
 jio: function(ins){
  i += (reg[ins[2]] == 1) ? parseInt(ins[3]) : 1;
 }
};

for(var i=0, ins; i<data.length;){	// i is updated by called instructions
 ins = /^(\w{3}) (\w|[+-]\d{1,2})(?:, (.+))?/.exec(data[i]);
// console.log(i, ins[1]);
 instructions[ins[1]](ins);
// console.log(reg.a, reg.b);
}
console.log(reg.a, reg.b);