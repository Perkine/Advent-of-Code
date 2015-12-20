// Too lazy to code a parser

var replacements = {
Al: ['ThF', 'ThRnFAr'],
 B: ['BCa', 'TiB', 'TiRnFAr'],
 Ca: ['CaCa', 'PB', 'PRnFAr', 'SiRnFYFAr', 'SiRnMgAr', 'SiTh'],
 F: ['CaF', 'PMg', 'SiAl'],
 H: ['CRnAlAr', 'CRnFYFYFAr', 'CRnFYMgAr', 'CRnMgYFAr', 'HCa', 'NRnFYFAr', 'NRnMgAr', 'NTh', 'OB', 'ORnFAr'],
 Mg: ['BF', 'TiMg'],
 N: ['CRnFAr', 'HSi'],
 O: ['CRnFYFAr', 'CRnMgAr', 'HP', 'NRnFAr', 'OTi'],
 P: ['CaP', 'PTi', 'SiRnFAr'],
 Si: ['CaSi'],
 Th: ['ThCa'],
 Ti: ['BP', 'TiTi'],
 e: ['HF', 'NAl', 'OMg']
};

var m = 'CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr';

m = m.replace(/([A-Z]{1}[a-z]*)/g, '$1|').split('|');

x = {};
x[m] = true;

m.forEach(function(value, index){
 if(value in replacements){
  replacements[value].forEach(function(v, i){
   var newM = m.slice(0)
   newM[index] = v;
   newM = newM.join('');
   if(!(newM in x)){
    x[newM] = true;
   }
  });
 }
});

console.log(Object.keys(x).length-1)

//remap replacements

for(var i=0, keys=Object.keys(replacements); i<keys.length; i++){
 for(var j=0; j<replacements[keys[i]].length; j++){
  replacements[replacements[keys[i]][j]] = keys[i];
 }
 delete replacements[keys[i]];
}
m = m.join('');

//reset count
count = 0;

// Lucky me, greedy solution worked fine
for(var i=0; i<200; i++){
 for(var j in replacements){
  m = m.replace(j, function(){count++; return replacements[j]});
 }
}

console.log('<br>'+count+': '+m)