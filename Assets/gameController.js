#pragma strict

var gamePhase		: int			= 1;			// 1 = Choose Bug, 2 = Choose Attacks, 3 = Actual gameplay, 4 = Move Back Home, 5 = Someone Won
var gameTimeLimit	: float			= 15.0;			// Time limit per game round
var playerBug		: GameObject[];					// Array holding the actual game objects for player bugs
var enemyBug		: GameObject[];					// Array holding the actual game objects for enemy bugs
var playerHealth	: GameObject[];
var enemyHealth		: GameObject[];
var playerFlagHealth	: GameObject;
var enemyFlagHealth		: GameObject;
var planningControl	: GameObject;
var choosingControl	: GameObject;
var playerFlag		: GameObject;
var enemyFlag		: GameObject;

var endGamePanel	: GameObject;
var endGameText		: GameObject;

var startButton		: GameObject;
var planningTitle	: GameObject;
var timerObject		: GameObject;

var titleMusic		: GameObject;
var playMusic		: GameObject;

function Start () {
	titleMusic		= GameObject.Find("Title Music(Clone)");
	playMusic		= GameObject.Find("Play Music");
	planningControl = GameObject.Find("Planning Control");
	choosingControl	= GameObject.Find("Choosing Control");
	playerFlag		= GameObject.Find("Player Flag");
	enemyFlag		= GameObject.Find("Enemy Flag");
}

function Update () {
	
}

function CheckHealthBars(){
	if (gamePhase < 3)
	{
		for (var p : int = 0; p < 5; p++)
		{
			if (playerBug[p].GetComponent(bugController).health > 0)
				playerHealth[p].SetActive(true);
		}
		for (var e : int = 0; e < 5; e++)
		{
			if (enemyBug[e].GetComponent(bugController).health > 0)
				enemyHealth[e].SetActive(true);
		}
	}
	else
	{
		for (var p2 : int = 0; p2 < 5; p2++)
		{
			playerHealth[p2].SetActive(false);
		}
		for (var e2 : int = 0; e2 < 5; e2++)
		{
			enemyHealth[e2].SetActive(false);
		}
	}
	if (gamePhase == 5)
	{
		playerFlagHealth.SetActive(false);
		enemyFlagHealth.SetActive(false);
	}
}

// This starts the game, called when player clicks the "Start Swarm" button
function BeginSwarm(){
	planningControl.GetComponent(planningController).RemoveParticles();
	if (titleMusic)
		titleMusic.GetComponent(audioController).StopMusic();
	playMusic.GetComponent(audioController).StartMusic();
	print ("Begin Swarm!");
	for (var i : int = 0; i < 5; i++)					// This calls FillInBlanks(), attaching the enemy flag as the target if player didn't select a target
    	planningControl.GetComponent(planningController).FillInBlanks(i);
    startButton.SetActive(false);						// Set this false
    planningTitle.SetActive(false);						// Set this false
    gamePhase		= 3;								// Set gamePhase to 3
    CheckHealthBars();
    EndGamePhase(gameTimeLimit);						// Set up the endGamePhase function with a delay
    timerObject.SetActive(true);						// Turn on the timer
    timerObject.GetComponent(countdownTimer).ResetAndStart();	// Reset & start the timer
    
   	var allEnemies = GameObject.FindGameObjectsWithTag ("enemyBug");
	for (var enemy in allEnemies)
	{
		if (enemy.GetComponent(bugController))
		{
			enemy.GetComponent(bugController).StartGame();
			enemy.GetComponent(bugController).EndGame(15.0);
		}
	}
	var allPlayer = GameObject.FindGameObjectsWithTag ("playerBug");
	for (var player in allPlayer)
	{
		if (player.GetComponent(bugController))
		{
			player.GetComponent(bugController).StartGame();
			player.GetComponent(bugController).EndGame(15.0);
		}
	}
	EndGame(15.0);
}

function EndGame(delay : float){
	yield WaitForSeconds(delay);
	if (titleMusic)
		titleMusic.GetComponent(audioController).StartMusic();
	playMusic.GetComponent(audioController).StopMusic();
}

// This function, called on a delay, ends the game phase and sends all surviving bugs back home
function EndGamePhase(delay : float){
	yield WaitForSeconds(delay);
	if (gamePhase != 5)
	{
		print ("Round Over!");
		gamePhase		= 4;
	    InvokeRepeating("ResetGame", 0.5, 0.2);			// Check to see if all bugs are reset every 0.2 seconds.
	}
}

// This resets game to planning phase
function ResetGame(){
	if (playerBug[0].GetComponent(bugController).isOnHome && 
		playerBug[1].GetComponent(bugController).isOnHome && 
		playerBug[2].GetComponent(bugController).isOnHome && 
		playerBug[3].GetComponent(bugController).isOnHome && 
		playerBug[4].GetComponent(bugController).isOnHome && 
		enemyBug[0].GetComponent(bugController).isOnHome && 
		enemyBug[1].GetComponent(bugController).isOnHome && 
		enemyBug[2].GetComponent(bugController).isOnHome && 
		enemyBug[3].GetComponent(bugController).isOnHome && 
		enemyBug[4].GetComponent(bugController).isOnHome)
	{
		gamePhase 		= 2;
		CheckHealthBars();
		startButton.SetActive(true);
	    planningTitle.SetActive(true);
	    choosingControl.GetComponent(choosingController).ChooseEnemyActions();
	}
}

function PlayAgain(){
	Application.LoadLevel("Game Scene");
}

function MainMenu(){
	Application.LoadLevel("Title");
}

// This function can be called when any enemy or flag is defeated.
function CheckWinConditions(){
	var playerWon 	= false;
	var enemyWon	= false;
	
	if ((playerBug[0].GetComponent(bugController).health <= 0 && 
		playerBug[1].GetComponent(bugController).health <= 0 && 
		playerBug[2].GetComponent(bugController).health <= 0 && 
		playerBug[3].GetComponent(bugController).health <= 0 && 
		playerBug[4].GetComponent(bugController).health <= 0) || 
		playerFlag.GetComponent(flagController).health <= 0)
		EnemyWon();
	
	if ((enemyBug[0].GetComponent(bugController).health <= 0 && 
		enemyBug[1].GetComponent(bugController).health <= 0 && 
		enemyBug[2].GetComponent(bugController).health <= 0 && 
		enemyBug[3].GetComponent(bugController).health <= 0 && 
		enemyBug[4].GetComponent(bugController).health <= 0) || 
		enemyFlag.GetComponent(flagController).health <= 0)
		PlayerWon();
}

function PlayerWon(){
	gamePhase = 5;
	CheckHealthBars();
	endGamePanel.SetActive(true);
	timerObject.SetActive(false);
	endGameText.GetComponent(UI.Text).text = "You Win!";
}

function EnemyWon(){
	gamePhase = 5;
	CheckHealthBars();
	endGamePanel.SetActive(true);
	timerObject.SetActive(false);
	endGameText.GetComponent(UI.Text).text = "You Lose!";
}


