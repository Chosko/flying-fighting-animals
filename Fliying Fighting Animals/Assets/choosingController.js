#pragma strict

var bugNumber		: int			= 0;				// Number, in order, of bugs selected (0-4)
var bugStartPos		: GameObject[];						// Array containing the start positions
var bug1Prefab		: GameObject;						// Bug Prefab...
var bug2Prefab		: GameObject;
var bug3Prefab		: GameObject;

var gameControl		: GameObject;
var choosingPanel	: GameObject;
var planText		: GameObject;

function Start () {
	gameControl = GameObject.Find("Game Control");
}

function ChooseBug(bugType : int){
	var bugToUse	: GameObject;							// Set the variable to a single one we can use
	if (bugType == 1)
		bugToUse = bug1Prefab;
	if (bugType == 2)
		bugToUse = bug2Prefab;
	if (bugType == 3)
		bugToUse = bug3Prefab;

	// Instantiate the actual bug and assign it to the Game Control array
	// Assign the bugID to the bug object
	// Increase bugNumber by 1
	gameControl.GetComponent(gameController).playerBug[bugNumber] = Instantiate(bugToUse, bugStartPos[bugNumber].transform.position, Quaternion.identity);
	var tempBugObj	= gameControl.GetComponent(gameController).playerBug[bugNumber];
	tempBugObj.GetComponent(bugController).bugID = bugNumber;
	tempBugObj.tag = "playerBug";			// set the tag on this object to "Player Bug"
	bugNumber 	+= 1;
	
	// If all 5 have been chosen....
	if (bugNumber == 5)
		EndBugChoosing();
}

function EndBugChoosing(){				// ends this phase
	choosingPanel.SetActive(false);								// Hide the choosing UI panel
	planText.SetActive(true);									// Activate the planning title text
	gameControl.GetComponent(gameController).gamePhase = 2;		// Set phase to 2
}