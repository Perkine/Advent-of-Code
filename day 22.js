var spells = {};

function Spell(name, manaCost, atk, def, hp, manaHeal, duration){
 this.name = name;
 this.manaCost = manaCost;
 this.atk = atk;
 this.def = def;
 this.hp = hp;
 this.manaHeal = manaHeal;
 this.duration = duration;
 spells[name] = this;
};

new Spell('Missile', 53, 4, 0, 0, 0, 0);
new Spell('Drain', 73, 2, 0, 2, 0, 0);
new Spell('Shield', 113, 0, 7, 0, 0, 6);
new Spell('Poison', 173, 3, 0, 0, 0, 6);
new Spell('Recharge', 229, 0, 0, 0, 101, 5);

var player = {hp: 50, mana: 500};
var boss = {hp: 55, atk: 8};

var minSpent = 9999;
runTurn(player.hp, player.mana, boss.hp, 0, 0, 0, 1, 0);
console.log('done', minSpent);
var minSpent = 9999;
runTurn(player.hp, player.mana, boss.hp, 0, 0, 0, 1, 0, true);
console.log('done', minSpent);

function runTurn(playerHP, playerMana, bossHP, shieldTimer, poisonTimer, rechargeTimer, turn, manaSpent, hardMode){
 function castSpell(spell, playerHP, playerMana, bossHP, shieldTimer, poisonTimer, rechargeTimer, turn, manaSpent){
  if(spell.name == 'Shield' && shieldTimer > 0 ||
     spell.name == 'Poison' && poisonTimer > 0 ||
     spell.name == 'Recharge' && rechargeTimer > 0 ||
     spell.manaCost > playerMana
    ){
     return;
  }
  if(spell.name == 'Missile'){
   bossHP -= spell.atk;
  }
  if(spell.name == 'Drain'){
   bossHP -= spell.atk;
   playerHP += spell.hp;
  }
  if(spell.name == 'Shield'){
   shieldTimer = spell.duration;
  }
  if(spell.name == 'Poison'){
   poisonTimer = spell.duration;
  }
  if(spell.name == 'Recharge'){
   rechargeTimer = spell.duration;
  }
  playerMana -= spell.manaCost;
  manaSpent +=  spell.manaCost;
  if(manaSpent >= minSpent){
   return;
  }
  if(bossHP > 0){
   runTurn(playerHP, playerMana, bossHP, shieldTimer, poisonTimer, rechargeTimer, turn+1, manaSpent, hardMode);
  } else{
   console.log('Player wins, spent', manaSpent, 'mana, in', turn, 'turns')
   if(manaSpent < minSpent){
    minSpent = manaSpent;
   }
   return;
  }
 };

 if(shieldTimer > 0){
  shieldTimer--;
 }
 if(poisonTimer > 0){
  bossHP -= spells.Poison.atk;
  poisonTimer--;
 }
 if(rechargeTimer > 0){
  playerMana += spells.Recharge.manaHeal;
  rechargeTimer--;
 }

 if(turn % 2){				// player turn
  if(hardMode && (--playerHP < 1)){
   return;
  }
  for(var i in spells){
   castSpell(spells[i], playerHP, playerMana, bossHP, shieldTimer, poisonTimer, rechargeTimer, turn, manaSpent);
  }
 } else {				// boss turn
  playerHP -= shieldTimer > 0 ? 1 : boss.atk;
  if(playerHP > 0){
   runTurn(playerHP, playerMana, bossHP, shieldTimer, poisonTimer, rechargeTimer, turn+1, manaSpent, hardMode);
  } else{
   return;
  } 
 }
};