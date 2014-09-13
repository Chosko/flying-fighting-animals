#pragma strict

var planText		: GameObject;							// Title text for this phase
var planPhase		: int				= 0;				// 0 = choosing bug, 1 = choosing target
var currentBug		: GameObject;							// Current bug setting it's target
var gameControl		: GameObject;							
var clickLayerMask	: LayerMask;							// Set to only "Primitives" layer
var playerFlag		: GameObject;
var tempEnemyObj	: GameObject;

function Start () {
	gameControl 	= GameObject.Find("Game Control");		// Set this object
	playerFlag		= GameObject.Find("Player Flag");
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
	currentBug.GetComponent(bugController).targetObject = null; 					// Remove the targetObject so when first choice was object then swiched to spot, then spot won't be overwritten by object cmd
	currentBug.GetComponent(bugController).targetSpot = mapPos;						// Set the targetSpot for selected bug to the chosen map Vector3 (Position)
	planPhase		= 0;			// Reset planPhase
}

function AttackBugChosen(bugID : int){				// Pass along the ENEMY Bug ID
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	currentBug.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).enemyBug[bugID]; // Set the targetObject for selected bug to the chosen bug object
	planPhase		= 0;			// Reset planPhase
}

function FlagChosen(flagObject : GameObject){
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	currentBug.GetComponent(bugController).targetObject = flagObject; // Set the targetObject for selected bug to the chosen bug object
	planPhase		= 0;			// Reset planPhase
}

function FillInBlanks(playerID : int){
	var tempPlayerBug = gameControl.GetComponent(gameController).playerBug[playerID];
	if (!tempPlayerBug.GetComponent(bugController).targetObject && tempPlayerBug.GetComponent(bugController).targetSpot == Vector3(0,0,0))
		tempPlayerBug.GetComponent(bugController).targetObject = GameObject.Find("Enemy Flag");
}

function EnemyChooseAttack(enemyID : int, playerID : int){
	tempEnemyObj = gameControl.GetComponent(gameController).enemyBug[enemyID];
	tempEnemyObj.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).playerBug[playerID];
}

function EnemyChoosePatrol(enemyID : int, posObj : GameObject){
	tempEnemyObj = gameControl.GetComponent(gameController).enemyBug[enemyID];
	tempEnemyObj.GetComponent(bugController).targetObject = null;
	tempEnemyObj.GetComponent(bugController).targetSpot	= posObj.transform.position;
	tempEnemyObj.GetComponent(bugController).targetSpot.y = gameControl.GetComponent(gameController).enemyBug[enemyID].transform.position.y;
}

function EnemyChooseDefend(enemyID : int, otherEnemyID : int){
	tempEnemyObj = gameControl.GetComponent(gameController).enemyBug[enemyID];
	tempEnemyObj.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).enemyBug[otherEnemyID];
}

function EnemyChooseFlag(enemyID : int){
	tempEnemyObj = gameControl.GetComponent(gameController).enemyBug[enemyID];
	tempEnemyObj.GetComponent(bugController).targetObject = playerFlag;
}






