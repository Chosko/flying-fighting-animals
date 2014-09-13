#pragma strict

var gameControl		: GameObject;
var planningControl	: GameObject;

function Start () {
	gameControl	= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
}

function OnMouseDown () {
	if (gameControl.GetComponent(gameController).gamePhase == 2)
	{
		var bugID		= GetComponent(bugController).bugID;
		planningControl.GetComponent(planningController).BugSelected(bugID);
	}
}