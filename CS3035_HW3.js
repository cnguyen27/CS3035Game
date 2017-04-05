var complete = false;
var player = {HP: 25, yPos:0,xPos:0,inventory:[]}
var worldMap = [];
var mapHistory =[];
var firstAlert = false;

$(document).ready( function(){

for(var i = 0; i < 8; i++){
worldMap[i] = [];
}
for(var i = 0; i < 8; i++){
mapHistory[i] = [];
}

function randomizer() {
  return Math.floor(Math.random() * (8 - 0));
}
function placePlayer(worldMap) {
	player.yPos = randomizer();
	player.xPos = randomizer();
	worldMap[player.yPos][player.xPos] = "S";
	inventorySlot = 0;
	hasP1 = false;
	hasP2 = false;
	console.log("Player position: " + player.xPos + " " + player.yPos);
}

function placeExit(worldMap){
	for(i = 0; i < 1; i++){
	exitX = randomizer();
	exitY = randomizer();
		if(worldMap[exitY][exitX] != undefined){
			i--;
		}
	worldMap[exitY][exitX] = "G";
	console.log("Exit positioned at " + exitX + " " + exitY);
	}
}

function placeWalls(worldMap,numOfWalls){
	for(var i = 0; i < numOfWalls; i++){
		wallX = randomizer();
		wallY = randomizer();
		if(worldMap[wallY][wallX] != undefined){
			i--;
		}else{
	worldMap[wallY][wallX] = "Wall";
	console.log("Wall " + i + " positioned at " + wallX + " " + wallY);
	}
	}
}

function placePrize1(worldMap){
	for(i = 0; i < 1; i++){
	P1X = randomizer();
	P1Y = randomizer();
		if(worldMap[P1Y][P1X] != undefined){
			i--;
		}else{
	worldMap[P1Y][P1X] = "Prize 1"
	console.log("Prize 1 positioned at " + P1X + " " + P1Y);
		}
	}
}

function placePrize2(worldMap){
	for(i = 0; i < 1; i++){
	P2X = randomizer();
	P2Y = randomizer();
		if(worldMap[P2Y][P2X] != undefined){
			i--;
		}else{
	worldMap[P2Y][P2X] = "Prize 2";
	console.log("Prize 2 positioned at " + P2X + " " + P2Y);
		}
	}
}

function placeChallenge(worldMap,numberOfChallenges){
	for(i = 0; i < numberOfChallenges; i++){
	challX = randomizer();
	challY = randomizer();
	if(worldMap[challY][challX] != undefined){
	i--;
	console.log("Position error");
	} else {
	switch(Math.floor(Math.random() * (4 - 0))){
		case 0:		
		var skeleton = {
			name: "Skeleton",
			HP: 5,
			Prize: "Undead Bone",
			intro: "You find a crypt of spooky skeletons, try to lure one out?",
			fight: function(){
				skeleton.HP = 5;
				while(player.HP > 0 && skeleton.HP > 0){
				switch(Math.floor(Math.random() * (2 - 0))){
					case 0:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					skeleton.HP = skeleton.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on challenge. Remaining HP: " + skeleton.HP + "<br>";
					break;
					case 1:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					player.HP = player.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on player.<br>";
					break;
						}
					if(skeleton.HP <= 0){
					//console.log("Challenge defeated");
					player.inventory[inventorySlot] = skeleton.Prize;
					inventorySlot++;
					playerInfo();
					document.getElementById("combat").innerHTML += "Skeleton defeated.<br>";
					document.getElementById("event").innerHTML += "You defeat a skeleton. Do you want to try to fight another skeleton?<br>";
					}else if(player.HP <= 0){
					complete = true;
					//console.log("Player defeated");
					playerInfo();
					document.getElementById("fight").style.visibility = "hidden";
					document.getElementById("run").style.visibility = "hidden";
					document.getElementById("combat").innerHTML = "You succumb to your injuries, hopefully another adventurer will find the Holy Grail in your stead.<br>";
					document.getElementById("reset").style.visibility = "visible";
					window.scroll(0,document.body.scrollHeight);
					}
				}
			}
		};
		worldMap[challY][challX] = skeleton;
		console.log("Skeleton positioned at " + challX + " " + challY);
		break;
		case 1:
		var zombie = {
			name: "Zombie",
			HP: 7,
			Prize: "Rotting Flesh",
			intro: "You find a cemetery full of wandering dead, try to lure one out?",
			fight: function(){
				zombie.HP = 7;
				while(player.HP > 0 && zombie.HP > 0){
				switch(Math.floor(Math.random() * (2 - 0))){
					case 0:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					zombie.HP = zombie.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on challenge. Remaining HP: " + zombie.HP + "<br>";
					break;
					case 1:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					player.HP = player.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on player.<br>";
					break;
						}
					if(zombie.HP <= 0){
					//console.log("Challenge defeated");
					player.inventory[inventorySlot] = zombie.Prize;
					inventorySlot++;
					playerInfo();
					document.getElementById("combat").innerHTML += "Zombie defeated.<br>";
					document.getElementById("event").innerHTML += "You defeat a zombie. Do you want to try to fight another zombie?<br>";
					}else if(player.HP <= 0){
					complete = true;
					//console.log("Player defeated");
					playerInfo();
					document.getElementById("fight").style.visibility = "hidden";
					document.getElementById("run").style.visibility = "hidden";
					document.getElementById("combat").innerHTML = "You succumb to your injuries, hopefully another adventurer will find the Holy Grail in your stead.<br>";
					document.getElementById("reset").style.visibility = "visible";
					window.scroll(0,document.body.scrollHeight);
					}
				}
			}
		};			
		worldMap[challY][challX] = zombie;
		console.log("Zombie positioned at " + challX + " " + challY);
		break;
		case 2:
		var bat = {
			name: "Bat",
			HP: 3,
			Prize: "Wing of Bat",
			intro: "You find a cave full of giant bats, try to lure one out?",
			fight: function(){
				bat.HP = 3;
				while(player.HP > 0 && bat.HP > 0){
				switch(Math.floor(Math.random() * (2 - 0))){
					case 0:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					bat.HP = bat.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on challenge. Remaining HP: " + bat.HP + "<br>";
					break;
					case 1:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					player.HP = player.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on player.<br>";
					break;
						}
					if(bat.HP <= 0){
					//console.log("Challenge defeated");
					player.inventory[inventorySlot] = bat.Prize;
					inventorySlot++;
					playerInfo();
					document.getElementById("combat").innerHTML += "Bat defeated.<br>";
					document.getElementById("event").innerHTML += "You defeat a bat. Do you want to try to fight another bat?<br>";
					}else if(player.HP <= 0){
					complete = true;
					//console.log("Player defeated");
					playerInfo();
					document.getElementById("fight").style.visibility = "hidden";
					document.getElementById("run").style.visibility = "hidden";
					document.getElementById("combat").innerHTML = "You succumb to your injuries, hopefully another adventurer will find the Holy Grail in your stead.<br>";
					document.getElementById("reset").style.visibility = "visible";
					window.scroll(0,document.body.scrollHeight);
					}
				}
			}
		};		
		worldMap[challY][challX] = bat;
		console.log("Bat positioned at " + challX + " " + challY);
		break;
		case 3:
		var wolf = {
			name: "Wolf",
			HP: 4,
			Prize: "Wolf Pelt",
			intro: "You find a den of wolves, try to lure one out?",
			fight: function(){
				wolf.HP = 4;
				while(player.HP > 0 && wolf.HP > 0){
				switch(Math.floor(Math.random() * (2 - 0))){
					case 0:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					wolf.HP = wolf.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on challenge. Remaining HP: " + wolf.HP + "<br>";
					break;
					case 1:
					var damage = Math.floor(Math.random() * (5 - 1) + 1);
					player.HP = player.HP - damage;
					document.getElementById("combat").innerHTML += damage + " damage inflicted on player.<br>";
					break;
						}
					if(wolf.HP <= 0){
					//console.log("Challenge defeated");
					player.inventory[inventorySlot] = wolf.Prize;
					inventorySlot++;
					playerInfo();
					document.getElementById("combat").innerHTML += "Wolf defeated.<br>";
					document.getElementById("event").innerHTML += "You defeat a wolf. Do you want to try to fight another wolf?<br>";
					}else if(player.HP <= 0){
					complete = true;
					//console.log("Player defeated");
					playerInfo();
					document.getElementById("fight").style.visibility = "hidden";
					document.getElementById("run").style.visibility = "hidden";
					document.getElementById("combat").innerHTML = "You succumb to your injuries, hopefully another adventurer will find the Holy Grail in your stead.<br>";
					document.getElementById("reset").style.visibility = "visible";
					window.scroll(0,document.body.scrollHeight);
					}
				}
		}
	};		
		worldMap[challY][challX] = wolf;
		console.log("Wolf positioned at " + challX + " " + challY);
		break;
	}
}
}
}

function main(){
	if(!complete){
	playerInfo();
	window.scroll(0,document.body.scrollHeight);
	}
}

function playerInfo(){
		document.getElementById("playerPosition").innerHTML = "Your current position is: " + player.xPos + "," + player.yPos;
		document.getElementById("playerHealth").innerHTML = "Your health is currently at: " + player.HP;
		if(player.inventory.length != 0){
		document.getElementById("playerInventory").innerHTML = "Your inventory currently has: ";
		for(var i = 0; i < player.inventory.length; i++){
			document.getElementById("playerInventory").innerHTML += player.inventory[i] + ", ";
		}
		}else{
		document.getElementById("playerInventory").innerHTML = "Your inventory is empty";
		}
}

function fill(worldMap){
	for(i = 0; i < 8; i++){
		for(j = 0; j < 8; j++){
			mapHistory[i][j] = '\xa0\xa0\xa0';
			if(worldMap[i][j] == undefined){
				worldMap[i][j] = "blank";
			}
		}
	}
	mapHistory[player.yPos][player.xPos] = "S";
}

var moveLeft = function moveLeft(){
		player.xPos = player.xPos - 1;
		if(player.xPos == -1){
			document.getElementById("event").innerHTML += "You hit the map border<br>";
			//console.log("You hit the map border.");
			player.xPos = player.xPos + 1;
		}
		if(worldMap[player.yPos][player.xPos] == "Wall"){
			document.getElementById("event").innerHTML += "There's a wall in the way<br>";
			updateMap();
			//console.log("Hit a wall.");
			player.xPos = player.xPos + 1;
		}
			if(!complete){
	updateMap();
	checkTile();
	main();
	}
}

var moveRight = function moveRight(){
		player.xPos = player.xPos + 1;
		if(player.xPos == 8){
			document.getElementById("event").innerHTML += "You hit the map border<br>";
			//console.log("You hit the map border.");
			player.xPos = player.xPos - 1;
		}
		if(worldMap[player.yPos][player.xPos] == "Wall"){
			document.getElementById("event").innerHTML += "There's a wall in the way<br>";
			updateMap();
			//console.log("Hit a wall.");
			player.xPos = player.xPos - 1;
		}
			if(!complete){
	updateMap();
	checkTile();
	main();
	}
}

var moveUp = function moveUp(){
		player.yPos = player.yPos - 1;
		if(player.yPos == -1){
			document.getElementById("event").innerHTML += "You hit the map border<br>";
			//console.log("You hit the map border.");
			player.yPos = player.yPos + 1;
		}
		if(worldMap[player.yPos][player.xPos] == "Wall"){
			document.getElementById("event").innerHTML += "There's a wall in the way<br>";
			updateMap();
			//console.log("Hit a wall.");
			player.yPos = player.yPos + 1;
		}
			if(!complete){
	updateMap();
	checkTile();
	main();
	}
}

var moveDown = function moveDown(){
		player.yPos = player.yPos + 1;
		if(player.yPos == 8){
			document.getElementById("event").innerHTML += "You hit the map border<br>";
			//console.log("You hit the map border.");
			player.yPos = player.yPos - 1;
		}
		if(worldMap[player.yPos][player.xPos] == "Wall"){
			document.getElementById("event").innerHTML += "There's a wall in the way<br>";
			updateMap();
			//console.log("Hit a wall.");
			player.yPos = player.yPos - 1;
		}
			if(!complete){
	updateMap();
	checkTile();
	main();
	}
}

var clearLog = function clearLog(){
	document.getElementById("event").innerHTML = "";
}

function clearCombat(){
	document.getElementById("combat").innerHTML = "";
}

function combatTrigger(){
	clearCombat();
	worldMap[player.yPos][player.xPos].fight();
	//console.log("Fight goes here");
}

function avoidCombat(){
	document.getElementById("fight").style.visibility = "hidden";
	document.getElementById("run").style.visibility = "hidden";
	document.getElementById("moveLeft").style.visibility = "visible";
	document.getElementById("moveRight").style.visibility = "visible";
	document.getElementById("moveUp").style.visibility = "visible";
	document.getElementById("moveDown").style.visibility = "visible";
	document.getElementById("event").innerHTML += "You continue on.<br>";
	clearCombat();
}

function checkTile() {
	if(worldMap[player.yPos][player.xPos] == "Prize 1"){
		player.inventory[inventorySlot] = "Book of Armaments";
		inventorySlot++;
		worldMap[P1Y][P1X] = "blank";
		if(hasP1 == false){
		document.getElementById("event").innerHTML += "You find a dusty tome in a knocked over bookshelf. You dust it off and see that it is the Book of Armaments, holding instructions on how to use the Holy Handgrenade.<br>";
		hasP1 = true;
		//console.log("Found 1st prize");
		}
	}
	if(worldMap[player.yPos][player.xPos] == "Prize 2"){
		player.inventory[inventorySlot] = "Holy Handgrenade";
		inventorySlot++;
		worldMap[P2Y][P2X] = "blank";
		if(hasP2 == false){
		document.getElementById("event").innerHTML += "You see something shiny in a fallen log. You kick the log and a Holy Handgrenade rolls out. You pick it up and store it, but you won't be able to use it without the Book of Armaments.<br>";		
		hasP2 = true;
		//console.log("Found 2nd prize");
		}
	}
	if(worldMap[player.yPos][player.xPos] == "G"){
		if(hasP1 && hasP2){
			complete = true;
			document.getElementById("event").innerHTML += "After reading the Book of Armaments with Holy Handgrenade in hand, you count to three, not two, nor four, and toss the grenade at the Rabbit of Caerbannog<br>";		
			document.getElementById("event").innerHTML += "You've found the Holy Grail! Your quest is complete!<br>";
			document.getElementById("moveLeft").style.visibility = "hidden";
			document.getElementById("moveRight").style.visibility = "hidden";
			document.getElementById("moveUp").style.visibility = "hidden";
			document.getElementById("moveDown").style.visibility = "hidden";
			document.getElementById("reset").style.visibility = "visible";			
			window.scroll(0,document.body.scrollHeight);
			
		} else {
			document.getElementById("event").innerHTML += "The Rabbit of Caerbannog guards the Holy Grail, the goal of your quest. You'll need something powerful to defeat it.<br>";		
		}
	}
	if(worldMap[player.yPos][player.xPos].name != undefined){
		document.getElementById("fight").style.visibility = "visible";
		document.getElementById("run").style.visibility = "visible";
		document.getElementById("moveLeft").style.visibility = "hidden";
		document.getElementById("moveRight").style.visibility = "hidden";
		document.getElementById("moveUp").style.visibility = "hidden";
		document.getElementById("moveDown").style.visibility = "hidden";
		document.getElementById("combat").innerHTML += worldMap[player.yPos][player.xPos].intro + "<br>";
	}
}

function createMap(tableData) {
  var table = document.getElementById("table");
  var tableBody = document.getElementById("map");

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}
function updateMap(){
var map = document.getElementById("table");
if(worldMap[player.yPos][player.xPos] == "Prize 2"){
	map.rows[player.yPos].cells[player.xPos].innerHTML = "2";
}else
if(worldMap[player.yPos][player.xPos] == "Prize 1"){
	map.rows[player.yPos].cells[player.xPos].innerHTML = "1";
}else
if(worldMap[player.yPos][player.xPos] == "G"){
	map.rows[player.yPos].cells[player.xPos].innerHTML = "G";
}else
if(worldMap[player.yPos][player.xPos] == "S"){
	map.rows[player.yPos].cells[player.xPos].innerHTML = "S";
}else
if(worldMap[player.yPos][player.xPos] == "Wall"){
	map.rows[player.yPos].cells[player.xPos].innerHTML = "W";
}else
if(worldMap[player.yPos][player.xPos].name != undefined){
map.rows[player.yPos].cells[player.xPos].innerHTML = "C";
	}else{
	map.rows[player.yPos].cells[player.xPos].innerHTML = "X";
	}
}

document.getElementById("reset").style.visibility = "hidden";
document.getElementById("fight").style.visibility = "hidden";
document.getElementById("run").style.visibility = "hidden";
$("#moveLeft").click(moveLeft);
$("#moveRight").click(moveRight);
$("#moveUp").click(moveUp);
$("#moveDown").click(moveDown);
$("#clearLog").click(clearLog);
$("#fight").click(combatTrigger);
$("#run").click(avoidCombat);
placePlayer(worldMap);
placeExit(worldMap);
placeWalls(worldMap,3);
placePrize1(worldMap);
placePrize2(worldMap);
placeChallenge(worldMap,4);
fill(worldMap);
createMap(mapHistory);
main();
});