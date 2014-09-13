#pragma strict

var planText		: GameObject;							// Title text for this phase
var planPhase		: int				= 0;				// 0 = choosing bug, 1 = choosing target
var currentBug		: GameObject;							// Current bug setting it's target
var gameControl		: GameObject;							
var clickLayerMask	: LayerMask;							// Set to only "Primitives" layer

function Start () {
	gameControl 	= GameObject.Find("Game Control");		// Set this object
}

function Update () {

}

function BugSelected(bugID : int){
	planText.GetComponent(UI.Text).text = "Choose a Target";						// Change the text to tell player what to do
	currentBug		= gameControl.GetComponent(gameController).playerBug[bugID];	// Set the current bug being selected for
	planPhase		= 1;			// Move planPhase Forward
}

function DefendBugChosen(bugID : int){
	if (gameControl.GetComponent(gameController).playerBug[bugID] != currentBug)	// Don't let player defend itself
	{
		planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
		currentBug.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).playerBug[bugID]; // Set the targetObject for selected bug to the chosen bug object
		planPhase		= 0;			// Reset planPhase
	}
}

function PatrolPosChosen(mapPos : Vector3){
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	mapPos.y = currentBug.transform.position.y;
	print ("mapPos: " + mapPos);
	currentBug.GetComponent(bugController).targetSpot = mapPos;						// Set the targetSpot for selected bug to the chosen map Vector3 (Position)
	planPhase		= 0;			// Reset planPhase
}

function AttackBugChosen(bugID : int){				// Pass along the ENEMY Bug ID
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	currentBug.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).enemyBug[bugID]; // Set the targetObject for selected bug to the chosen bug object
	planPhase		= 0;			// Reset planPhase
}