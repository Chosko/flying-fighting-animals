﻿#pragma strict

var gameControl		: GameObject;
var planningControl	: GameObject;

function Start () {
	gameControl	= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
}

function OnMouseDown () {
	if (gameControl.GetComponent(gameController).gamePhase == 2)						// Only active during planning phase
	{
		//print ("Mouse Down on " + this.name);
		//print ("plan phase = " + planningControl.GetComponent(planningController).planPhase);
		var bugID			= GetComponent(bugController).bugID;						// Bug ID of this bug (From other script)
		if (planningControl.GetComponent(planningController).planPhase	== 0)			// If the planPhase is selecting a bug
			planningControl.GetComponent(planningController).BugSelected(bugID);		// Tell planningControl that this was the bug selected
		else if (planningControl.GetComponent(planningController).planPhase	== 1)		// If the planPhase is selecting a target
			planningControl.GetComponent(planningController).DefendBugChosen(bugID);	// Tell planningControl that this was the bug selected TO DEFEND
	}
}