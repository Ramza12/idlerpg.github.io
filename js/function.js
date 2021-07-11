playerName = "Player";
playerLv = 1;
playerXp = 0;
toNext = 100;
toNextBar = 0;
playerCurrentHp = 100;
playerMaxHp = 100;
playerHpBar = 0;
let playerHpValue = document.getElementById("playerHpBar");
playerAtk = 10;
playerDef = 10;
playerPen = 5;
modifiedAtk = 10;
modifiedDef = 10;
modifiedPen = 5;
modifiedMaxHp = 100;
opponentLv = 1;
opponentMaxLv = 1;
xpGain = 2;
opponentCurrentHp = 50;
opponentMaxHp = 50;
opponentHpBar = 0;
let opponentHpValue = document.getElementById("opponentHpBar");
let stayLevel = document.getElementById("keepLv")
opponentAtk = 2;
opponentDef = 2;
opponentPen = 0;
prestigePoint = 0;
bankedPP = 0;
stat1 = 2;
stat2 = 2;
stat3 = 10;
stat4 = 1;
stat5 = 1;
stat6 = 1;
stat7 = 1;
stat8 = 1;
modifiedstat5 = 0;
modifiedstat6 = 0;
modifiedstat7 = 0;
modifiedstat8 = 0;
checkbox = "";

function changeName() {

var playerName = prompt("Enter new name:","");
document.getElementById("playerName").innerHTML = playerName

}

setInterval(function() {

if (stayLevel.checked) {
checkbox="check";
} else {
checkbox="uncheck";
} 

totalToOpponent = Math.floor((opponentDef - modifiedPen)*100)/100;
if (totalToOpponent <=0) {
totalToOpponent = 0;
}
totalToPlayer = Math.floor((modifiedDef - opponentPen)*100)/100;
if (totalToPlayer <=0) {
totalToPlayer = 0;
}

dmgToOpponent = modifiedAtk - totalToOpponent
dmgToPlayer = opponentAtk - totalToPlayer

if (dmgToOpponent <=0) {
dmgToOpponent = 0;
}
if (dmgToPlayer <=0) {
dmgToPlayer = 0;
}

opponentCurrentHp = Math.ceil((opponentCurrentHp - (dmgToOpponent/10))*100)/100
playerCurrentHp = Math.ceil((playerCurrentHp - (dmgToPlayer/10))*100)/100

opponentCurrentHp = opponentCurrentHp.toFixed(1);
playerCurrentHp = playerCurrentHp.toFixed(1)

document.getElementById("playerCurrentHp").innerHTML = playerCurrentHp;
document.getElementById("opponentCurrentHp").innerHTML = opponentCurrentHp;

playerHpBar = playerCurrentHp/modifiedMaxHp;
opponentHpBar = opponentCurrentHp/opponentMaxHp;

playerHpValue.value = playerHpBar;
opponentHpValue.value = opponentHpBar;

if (playerCurrentHp <= 0) {
opponentWin();
} else if (opponentCurrentHp <= 0) {
playerWin();
}

}, 100); // 1000ms = 1 second

setInterval(function() {
Save();
}, 100);



function recalculate() {

opponentAtk = Math.ceil(5 + (2*(opponentLv-1)) + (3*(opponentLv-1)**1.2));
opponentDef = Math.ceil(2 + (opponentLv-1) + (2*(opponentLv-1)**1.2));
opponentPen = Math.ceil(0 + (opponentLv-1) + ((opponentLv-1)**1.15));
opponentMaxHp = Math.ceil(50 + (5*(opponentLv-1)) + (5*(opponentLv-1)**1.5));
opponentCurrentHp = opponentMaxHp;
xpGain = -1 + 3*(opponentLv);

document.getElementById("playerXp").innerHTML = playerXp;
document.getElementById("opponentAtk").innerHTML = opponentAtk;
document.getElementById("opponentDef").innerHTML = opponentDef;
document.getElementById("opponentPen").innerHTML = opponentPen;
document.getElementById("opponentCurrentHp").innerHTML = opponentCurrentHp;
document.getElementById("opponentMaxHp").innerHTML = opponentMaxHp;
document.getElementById("opponentLv").innerHTML = opponentLv;
document.getElementById("xpGain").innerHTML = xpGain;

playerCurrentHp = modifiedMaxHp;
document.getElementById("playerCurrentHp").innerHTML = playerCurrentHp;

playerHpValue.value = 1;
opponentHpValue.value = 1;

opponentMaxLv = Math.max(opponentLv, opponentMaxLv)

bankedPP = Math.floor((opponentMaxLv - 0.1) / 5)
document.getElementById("bankedPP").innerHTML = bankedPP;

}

function playerWin() {

playerXp += xpGain;
toNextBar = playerXp/toNext;
document.getElementById("toNextBar").value = toNextBar;

if (stayLevel.checked) {
} else {
opponentLv += 1;
}

if (playerXp >= toNext) {
levelUp();
}

recalculate();

}

function opponentWin() {

opponentLv -= 1;

recalculate();

}

function levelUp() {

playerXp = playerXp - toNext;
playerLv += 1;
toNext = 50 + ( 50*(playerLv)) + Math.floor(Math.floor((60*(playerLv)**1.55)*50)/100)

toNextBar = playerXp/toNext;
document.getElementById("toNextBar").value = toNextBar;

playerAtk = playerAtk + stat1
playerDef = playerDef + stat2
playerMaxHp = playerMaxHp + stat3
playerPen = playerPen + stat4

modifiedAtk = Math.floor(playerAtk * stat5)
modifiedDef = Math.floor(playerDef * stat6)
modifiedMaxHp = Math.floor(playerMaxHp * stat7)
modifiedPen = Math.floor(playerPen * stat8)

document.getElementById("playerLv").innerHTML = playerLv;
document.getElementById("playerXp").innerHTML = playerXp;
document.getElementById("toNext").innerHTML = toNext;
document.getElementById("playerAtk").innerHTML = modifiedAtk;
document.getElementById("playerDef").innerHTML = modifiedDef;
document.getElementById("playerMaxHp").innerHTML = modifiedMaxHp;
document.getElementById("playerPen").innerHTML = modifiedPen;

}

function attackAction () {

totalToOpponent = Math.floor((opponentDef - modifiedPen)*100)/100;
if (totalToOpponent <=0) {
totalToOpponent = 0;
}

dmgToOpponent = modifiedAtk - totalToOpponent

if (dmgToOpponent <=0) {
dmgToOpponent = 0;
}

opponentCurrentHp = Math.ceil((opponentCurrentHp - (dmgToOpponent))*100)/100

document.getElementById("opponentCurrentHp").innerHTML = opponentCurrentHp;

opponentHpBar = opponentCurrentHp/opponentMaxHp;

opponentHpValue.value = opponentHpBar;

if (opponentCurrentHp <= 0) {
playerWin();
}

}

function prevLevel() {

if (opponentLv <= 1) {
} else {
opponentLv -= 1
recalculate();
}

}

function nextLevel() {

if (opponentMaxLv < opponentLv + 1) {
} else {
opponentLv += 1;
recalculate();
}

}

function prestige() {

var areYouSure = confirm("Are you sure you want to prestige? Your progress will be reset, but you keep your Perks and Prestige Points.")

if (areYouSure == false) {
} else {
prestigePoint += bankedPP;
bankedPP = 0;
opponentLv = 1;
opponentMaxLv = 1;
playerLv = 1;
playerXp = 0;
toNext = 100;
playerAtk = 10;
playerDef = 10;
playerMaxHp = 100;
playerPen = 2;
document.getElementById("playerLv").innerHTML = playerLv;
document.getElementById("toNextBar").value = 0;
document.getElementById("toNext").innerHTML = toNext;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
document.getElementById("bankedPP").innerHTML = bankedPP;
modifiedAtk = Math.floor(playerAtk * stat5);
modifiedDef = Math.floor(playerDef * stat6);
modifiedMaxHp = Math.floor(playerMaxHp * stat7);
modifiedPen = Math.floor(playerPen * stat8);
document.getElementById("playerAtk").innerHTML = modifiedAtk;
document.getElementById("playerDef").innerHTML = modifiedDef;
document.getElementById("playerMaxHp").innerHTML = modifiedMaxHp;
document.getElementById("playerPen").innerHTML = modifiedPen;
recalculate();
}


}

function addstat1() {
if (prestigePoint <= 0.99) {
} else {
stat1 += 2;
prestigePoint -= 1;
document.getElementById("atkPerLv").innerHTML = stat1;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat2() {

if (prestigePoint <= 0.99) {
} else {
stat2 += 2;
prestigePoint -= 1;
document.getElementById("defPerLv").innerHTML = stat2;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat3() {

if (prestigePoint <= 0.99) {
} else {
stat3 += 10;
prestigePoint -= 1;
document.getElementById("hpPerLv").innerHTML = stat3;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat4() {

if (prestigePoint <= 0.99) {
} else {
stat4 += 1;
prestigePoint -= 1;
document.getElementById("penPerLv").innerHTML = stat4;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat5() {

if (prestigePoint <= 0.99) {
} else {
stat5 = (Math.floor((stat5 + 0.05)*100)/100);
modifiedstat5 = stat5*100-100;
modifiedstat5 = modifiedstat5.toFixed(0);
prestigePoint -= 1;
document.getElementById("bonusAtk").innerHTML = modifiedstat5;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat6() {

if (prestigePoint <= 0.99) {
} else {
stat6 = (Math.floor((stat6 + 0.05)*100)/100);
modifiedstat6 = stat6*100-100;
modifiedstat6 = modifiedstat6.toFixed(0);
prestigePoint -= 1;
document.getElementById("bonusDef").innerHTML = modifiedstat6;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat7() {

if (prestigePoint <= 0.99) {
} else {
stat7 = (Math.floor((stat7 + 0.05)*100)/100);
modifiedstat7 = stat7*100-100;
modifiedstat7 = modifiedstat7.toFixed(0);
prestigePoint -= 1;
document.getElementById("bonusHp").innerHTML = modifiedstat7;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function addstat8() {

if (prestigePoint <= 0.99) {
} else {
stat8 = (Math.floor((stat8 + 0.1)*100)/100);
modifiedstat8 = stat8*100-100;
modifiedstat8 = modifiedstat8.toFixed(0);
prestigePoint -= 1;
document.getElementById("bonusPen").innerHTML = modifiedstat8;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
}

}

function Save() {
var SaveFile = {
playerName: playerName,
playerLv: playerLv,
playerXp: playerXp,
toNext: toNext,
toNextBar: toNextBar,
playerCurrentHp: playerCurrentHp,
playerMaxHp: playerMaxHp,
playerHpBar: playerHpBar,
playerAtk: playerAtk,
playerDef: playerDef,
playerPen: playerPen,
modifiedAtk: modifiedAtk,
modifiedDef: modifiedDef,
modifiedPen: modifiedPen,
modifiedMaxHp: modifiedMaxHp,
opponentLv: opponentLv,
opponentMaxLv: opponentMaxLv,
xpGain: xpGain,
opponentCurrentHp: opponentCurrentHp,
opponentMaxHp: opponentMaxHp,
opponentHpBar: opponentHpBar,
opponentAtk: opponentAtk,
opponentDef: opponentDef,
opponentPen: opponentPen,
prestigePoint: prestigePoint,
bankedPP: bankedPP,
stat1: stat1,
stat2: stat2,
stat3: stat3,
stat4: stat4,
stat5: stat5,
stat6: stat6,
stat7: stat7,
stat8: stat8,
modifiedstat5: modifiedstat5,
modifiedstat6: modifiedstat6,
modifiedstat7: modifiedstat7,
modifiedstat8: modifiedstat8
}

localStorage.setItem("SaveFile",JSON.stringify(SaveFile))

}

function Load() {
var LoadFile = JSON.parse(localStorage.getItem("SaveFile"));

if (typeof LoadFile.playerName !=="undefined") playerName  = LoadFile.playerName 
if (typeof LoadFile.playerLv !=="undefined") playerLv  = LoadFile.playerLv 
if (typeof LoadFile.playerXp !=="undefined") playerXp  = LoadFile.playerXp 
if (typeof LoadFile.toNext !=="undefined") toNext  = LoadFile.toNext 
if (typeof LoadFile.toNextBar !=="undefined") toNextBar  = LoadFile.toNextBar 
if (typeof LoadFile.playerCurrentHp !=="undefined") playerCurrentHp  = LoadFile.playerCurrentHp 
if (typeof LoadFile.playerMaxHp !=="undefined") playerMaxHp  = LoadFile.playerMaxHp 
if (typeof LoadFile.playerHpBar !=="undefined") playerHpBar  = LoadFile.playerHpBar 
if (typeof LoadFile.playerAtk !=="undefined") playerAtk  = LoadFile.playerAtk 
if (typeof LoadFile.playerDef !=="undefined") playerDef  = LoadFile.playerDef 
if (typeof LoadFile.playerPen !=="undefined") playerPen  = LoadFile.playerPen 
if (typeof LoadFile.modifiedAtk !=="undefined") modifiedAtk  = LoadFile.modifiedAtk 
if (typeof LoadFile.modifiedDef !=="undefined") modifiedDef  = LoadFile.modifiedDef 
if (typeof LoadFile.modifiedPen !=="undefined") modifiedPen  = LoadFile.modifiedPen 
if (typeof LoadFile.modifiedMaxHp !=="undefined") modifiedMaxHp  = LoadFile.modifiedMaxHp 
if (typeof LoadFile.opponentLv !=="undefined") opponentLv  = LoadFile.opponentLv 
if (typeof LoadFile.opponentMaxLv !=="undefined") opponentMaxLv  = LoadFile.opponentMaxLv 
if (typeof LoadFile.xpGain !=="undefined") xpGain  = LoadFile.xpGain 
if (typeof LoadFile.opponentCurrentHp !=="undefined") opponentCurrentHp  = LoadFile.opponentCurrentHp 
if (typeof LoadFile.opponentMaxHp !=="undefined") opponentMaxHp  = LoadFile.opponentMaxHp 
if (typeof LoadFile.opponentHpBar !=="undefined") opponentHpBar  = LoadFile.opponentHpBar 
if (typeof LoadFile.opponentAtk !=="undefined") opponentAtk  = LoadFile.opponentAtk 
if (typeof LoadFile.opponentDef !=="undefined") opponentDef  = LoadFile.opponentDef 
if (typeof LoadFile.opponentPen !=="undefined") opponentPen  = LoadFile.opponentPen 
if (typeof LoadFile.prestigePoint !=="undefined") prestigePoint  = LoadFile.prestigePoint 
if (typeof LoadFile.bankedPP !=="undefined") bankedPP  = LoadFile.bankedPP 
if (typeof LoadFile.stat1 !=="undefined") stat1  = LoadFile.stat1 
if (typeof LoadFile.stat2 !=="undefined") stat2  = LoadFile.stat2 
if (typeof LoadFile.stat3 !=="undefined") stat3  = LoadFile.stat3 
if (typeof LoadFile.stat4 !=="undefined") stat4  = LoadFile.stat4 
if (typeof LoadFile.stat5 !=="undefined") stat5  = LoadFile.stat5 
if (typeof LoadFile.stat6 !=="undefined") stat6  = LoadFile.stat6 
if (typeof LoadFile.stat7 !=="undefined") stat7  = LoadFile.stat7 
if (typeof LoadFile.stat8 !=="undefined") stat8  = LoadFile.stat8 
if (typeof LoadFile.modifiedstat5 !=="undefined") modifiedstat5  = LoadFile.modifiedstat5 
if (typeof LoadFile.modifiedstat6 !=="undefined") modifiedstat6  = LoadFile.modifiedstat6 
if (typeof LoadFile.modifiedstat7 !=="undefined") modifiedstat7  = LoadFile.modifiedstat7 
if (typeof LoadFile.modifiedstat8 !=="undefined") modifiedstat8  = LoadFile.modifiedstat8 


document.getElementById("playerName").innerHTML = playerName;
document.getElementById("playerLv").innerHTML = playerLv;
document.getElementById("playerXp").innerHTML = playerXp;
document.getElementById("toNext").innerHTML = toNext;
document.getElementById("playerCurrentHp").innerHTML = playerCurrentHp;
document.getElementById("playerMaxHp").innerHTML = modifiedMaxHp;
document.getElementById("playerHpBar").value = playerHpBar
document.getElementById("playerAtk").innerHTML = modifiedAtk;
document.getElementById("playerDef").innerHTML = modifiedDef;
document.getElementById("playerPen").innerHTML = modifiedPen;
document.getElementById("opponentLv").innerHTML = opponentLv;
document.getElementById("xpGain").innerHTML = xpGain;
document.getElementById("opponentCurrentHp").innerHTML = opponentCurrentHp;
document.getElementById("opponentMaxHp").innerHTML = opponentMaxHp
document.getElementById("opponentHpBar").value = opponentHpBar
document.getElementById("opponentAtk").innerHTML = opponentAtk;
document.getElementById("opponentDef").innerHTML = opponentDef;
document.getElementById("opponentPen").innerHTML = opponentPen;
document.getElementById("prestigePoint").innerHTML = prestigePoint;
document.getElementById("bankedPP").innerHTML = bankedPP;
document.getElementById("atkPerLv").innerHTML = stat1;
document.getElementById("defPerLv").innerHTML = stat2;
document.getElementById("hpPerLv").innerHTML = stat3;
document.getElementById("penPerLv").innerHTML = stat4;
document.getElementById("bonusAtk").innerHTML = modifiedstat5;
document.getElementById("bonusDef").innerHTML = modifiedstat6;
document.getElementById("bonusHp").innerHTML = modifiedstat7;
document.getElementById("bonusPen").innerHTML = modifiedstat8;

}
