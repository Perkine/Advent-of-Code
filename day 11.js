var data = 'hepxcrrq';
var part1 = nextPass(data);
var part2 = nextPass(part1);

console.log(part1, part2);

function nextPass(pass){
 var letters = 'abcdefghijklmnopqrstuvwxyz';
 pass = pass.split('');

 do{
  changeLetter(7);
 } while(!valid(pass.join('')));

 return pass.join('');

 function changeLetter(index){
  var letter = pass[index];
  var i = letters.indexOf(letter);
  if(letters[i+1]){
   pass[index] = letters[i+1];
  } else {
   pass[index] = letters[0];
   changeLetter(index - 1);
  }
 };

 function valid(pass){
  var reA = /[iol]/g;
  var reB = /(?:(?:(\w)\1)(?!\w*\1\1)\w*){2}/g;

  if(reA.test(pass) || !reB.test(pass)){
   return false;
  }
  for(var i=0; i<6; i++){
   if(~letters.indexOf(pass.substr(i, 3)))
    return true;  
  }
  return false;
 };
};