#pragma strict

var gamePhase		: int			= 1;			// 1 = Choose Bug, 2 = Choose Attacks, 3 = Actual gameplay, 4 = Game Over
var gameTimeLimit	: float			= 15.0;			// Time limit per game round
var playerBug		: GameObject[];					// Array holding the actual game objects for player bugs
var enemyBug		: GameObject[];					// Array holding the actual game objects for enemy bugs
var planningControl	: GameObject;

var startButton		: GameObject;
var planningTitle	: GameObject;
var timerObject		: GameObject;

function Start () {
	planningControl = GameObject.Find("Planning Control");
}

function Update () {

}

// This starts the game, called when player clicks the "Start Swarm" button
function BeginSwarm(){
	print ("Begin Swarm!");
	for(var i : int = 0; i < 5; i++)					// This calls FillInBlanks(), attaching the enemy flag as the target if player didn't select a target
    	planningControl.GetComponent(planningController).FillInBlanks(i);
    startButton.SetActive(false);						// Set this false
    planningTitle.SetActive(false);						// Set this false
    gamePhase		= 3;								// Set gamePhase to 3
    EndGamePhase(gameTimeLimit);						// Set up the endGamePhase function with a delay
    timerObject.SetActive(true);						// Turn on the timer
    timerObject.GetComponent(countdownTimer).ResetAndStart();	// Reset & start the timer
}

// This function, called on a delay, ends the game phase and sends all surviving bugs back home
function EndGamePhase(delay : float){
	yield WaitForSeconds(delay);
	// TO DO:  Insert code here for ending phase and returning bugs home
	print ("Round Over!");
	gamePhase		= 2;
	startButton.SetActive(true);
    planningTitle.SetActive(true);
}

// This function can be called when any enemy or flag is defeated.
function CheckWinConditions(){
	// TO DO:  Check if enemy has won
	// TO DO:  Check if player has won
}

function PlayerWon(){

}

function EnemyWon(){

}


