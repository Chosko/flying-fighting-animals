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
	var bugToUse	: GameObject;
	if (bugType == 1)
		bugToUse = bug1Prefab;
	if (bugType == 2)
		bugToUse = bug2Prefab;
	if (bugType == 3)
		bugToUse = bug3Prefab;
	gameControl.GetComponent(gameController).playerBug[bugNumber] = Instantiate(bugToUse, bugStartPos[bugNumber].transform.position, Quaternion.identity);
	bugNumber 	+= 1;
	
	if (bugNumber == 5)
		EndBugChoosing();
}

function EndBugChoosing(){
	choosingPanel.SetActive(false);
	planningControl.SetActive(true);
}