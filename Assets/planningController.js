#pragma strict

var planText		: GameObject;							// Title text for this phase
var planPhase		: int				= 0;				// 0 = choosing bug, 1 = choosing target
var currentBug		: GameObject;							// Current bug setting it's target
var gameControl		: GameObject;							
var clickLayerMask	: LayerMask;							// Set to only "Primitives" layer
var playerFlag		: GameObject;
var tempEnemyObj	: GameObject;

var selectedParticle	: GameObject;
var targettedParticle	: GameObject;
var selectedObject		: GameObject[];
var targettedObject		: GameObject[];
var lineObject			: GameObject[];
var linePrefab			: GameObject;

function Start () {
	gameControl 	= GameObject.Find("Game Control");		// Set this object
	playerFlag		= GameObject.Find("Player Flag");
}

function Update () {

}

function SetLine(bugID : int, mapPos : Vector3){
	print ("Set: " + mapPos);
	if (lineObject[bugID])
		Destroy(lineObject[bugID]);
	lineObject[bugID] = Instantiate(linePrefab, transform.position, transform.rotation);
	lineObject[bugID].GetComponent(LineRenderer).SetPosition(0, selectedObject[bugID].transform.position);
	if (mapPos == Vector3(0,0,0))
		lineObject[bugID].GetComponent(LineRenderer).SetPosition(1, targettedObject[bugID].transform.position);
	else
		lineObject[bugID].GetComponent(LineRenderer).SetPosition(1, mapPos);
}

function BugSelected(bugID : int){
	
	planText.GetComponent(UI.Text).text = "Choose a Target";						// Change the text to tell player what to do
	currentBug		= gameControl.GetComponent(gameController).playerBug[bugID];	// Set the current bug being selected for
	if (!selectedObject[bugID])
		selectedObject[bugID] = Instantiate(selectedParticle, currentBug.transform.position + (Vector3.up * 10), transform.rotation);
	planPhase		= 1;			// Move planPhase Forward
}

function DefendBugChosen(bugID : int){
	var defendThisBug	= gameControl.GetComponent(gameController).playerBug[bugID];
	if (defendThisBug != currentBug)	// Don't let player defend itself
	{
		if (targettedObject[currentBug.GetComponent(bugController).bugID])
			Destroy(targettedObject[currentBug.GetComponent(bugController).bugID]);
		targettedObject[currentBug.GetComponent(bugController).bugID] = Instantiate(targettedParticle, defendThisBug.transform.position + (Vector3.up * 10), transform.rotation);
		SetLine(currentBug.GetComponent(bugController).bugID, Vector3(0,0,0));
		planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
		currentBug.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).playerBug[bugID]; // Set the targetObject for selected bug to the chosen bug object
		planPhase		= 0;			// Reset planPhase
	}
}

function PatrolPosChosen(mapPos : Vector3){
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	mapPos.y = currentBug.transform.position.y;
	currentBug.GetComponent(bugController).targetSpot = mapPos;						// Set the targetSpot for selected bug to the chosen map Vector3 (Position)
	currentBug.GetComponent(bugController).targetObject = null;	
	planPhase		= 0;			// Reset planPhase
	if (targettedObject[currentBug.GetComponent(bugController).bugID])
		Destroy(targettedObject[currentBug.GetComponent(bugController).bugID]);
	SetLine(currentBug.GetComponent(bugController).bugID, mapPos);
	targettedObject[currentBug.GetComponent(bugController).bugID] = Instantiate(targettedParticle, mapPos, transform.rotation);
}

function AttackBugChosen(bugID : int){				// Pass along the ENEMY Bug ID
	var attackThisBug	= gameControl.GetComponent(gameController).enemyBug[bugID];
	if (targettedObject[currentBug.GetComponent(bugController).bugID])
		Destroy(targettedObject[currentBug.GetComponent(bugController).bugID]);
	targettedObject[currentBug.GetComponent(bugController).bugID] = Instantiate(targettedParticle, attackThisBug.transform.position + (Vector3.up * 10), transform.rotation);
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	currentBug.GetComponent(bugController).targetObject = gameControl.GetComponent(gameController).enemyBug[bugID]; // Set the targetObject for selected bug to the chosen bug object
	SetLine(currentBug.GetComponent(bugController).bugID, Vector3(0,0,0));
	planPhase		= 0;			// Reset planPhase
}

function FlagChosen(flagObject : GameObject){
	if (targettedObject[currentBug.GetComponent(bugController).bugID])
		Destroy(targettedObject[currentBug.GetComponent(bugController).bugID]);
	targettedObject[currentBug.GetComponent(bugController).bugID] = Instantiate(targettedParticle, flagObject.transform.position + (Vector3.up * 10), transform.rotation);
	planText.GetComponent(UI.Text).text = "Click A Bug";							// Change the text to tell the player what to do
	currentBug.GetComponent(bugController).targetObject = flagObject; // Set the targetObject for selected bug to the chosen bug object
	SetLine(currentBug.GetComponent(bugController).bugID, Vector3(0,0,0));
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

function RemoveParticles(){
	Destroy(targettedObject[1]);
	Destroy(targettedObject[2]);
	Destroy(targettedObject[3]);
	Destroy(targettedObject[4]);
	Destroy(targettedObject[0]);
	Destroy(selectedObject[1]);
	Destroy(selectedObject[2]);
	Destroy(selectedObject[3]);
	Destroy(selectedObject[4]);
	Destroy(selectedObject[0]);
	Destroy(lineObject[1]);
	Destroy(lineObject[2]);
	Destroy(lineObject[3]);
	Destroy(lineObject[4]);
	Destroy(lineObject[0]);
}





