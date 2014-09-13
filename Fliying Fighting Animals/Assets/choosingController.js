#pragma strict

var bugNumber		: int			= 0;
var bugStartPos		: GameObject[];
var bug1Prefab		: GameObject;
var bug2Prefab		: GameObject;
var bug3Prefab		: GameObject;

var gameControl		: GameObject;
var choosingPanel	: GameObject;
var planningControl	: GameObject;

function Start () {
	gameControl = GameObject.Find("Game Control");
}

function ChooseBug(bugType : int){
	print ("Choose Bug ID " + bugNumber + " is " + bugType);
	var bugToUse	: GameObject;
	if (bugType == 1)
		bugToUse = bug1Prefab;
	if (bugType == 2)
		bugToUse = bug2Prefab;
	if (bugType == 3)
		bugToUse = bug3Prefab;
	print ("bugToUse Name: " + bugToUse.name);
	gameControl.GetComponent(gameController).playerBug[bugNumber] = Instantiate(bugToUse, bugStartPos[bugNumber].transform.position, Quaternion.identity);
	print ("spacer");
	var tempBugObj	= gameControl.GetComponent(gameController).playerBug[bugNumber];
	tempBugObj.GetComponent(bugController).bugID = bugNumber;
	bugNumber 	+= 1;
	print ("new But Number: " + bugNumber);
	
	if (bugNumber == 5)
		EndBugChoosing();
}

function EndBugChoosing(){
	choosingPanel.SetActive(false);
	planningControl.SetActive(true);
	gameControl.GetComponent(gameController).gamePhase = 2;
}