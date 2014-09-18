#pragma strict

var bugNumber		: int			= 0;				// Number, in order, of bugs selected (0-4)
var bugStartPos		: GameObject[];						// Array containing the start positions
var enemyStartPos	: GameObject[];
var bugPrefab		: GameObject[];						// Array containing bug prefabs
var enemyPatrolPos	: GameObject[];						// Array of potential enemy patrol positions;

var gameControl		: GameObject;
var planningControl	: GameObject;
var choosingPanel	: GameObject;
var planText		: GameObject;
var startButton		: GameObject;

var selectedParticle	: GameObject;
var targettedParticle	: GameObject;
var selectedObject		: GameObject;

function Start () {
	gameControl 	= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
}

function ChooseBug(bugType : int){
	// Instantiate the actual bug and assign it to the Game Control array
	// Assign the bugID to the bug object
	// Increase bugNumber by 1
	gameControl.GetComponent(gameController).playerBug[bugNumber] 	= Instantiate(bugPrefab[bugType], bugStartPos[bugNumber].transform.position, Quaternion.identity);
	var tempBugObj													= gameControl.GetComponent(gameController).playerBug[bugNumber];
	var tempHealthBar												= gameControl.GetComponent(gameController).playerHealth[bugNumber];
	tempHealthBar.GetComponent(healthBarScript).targetObject		= tempBugObj;
	tempHealthBar.SetActive(true);
	tempBugObj.GetComponent(bugController).bugID 					= bugNumber;
	//tempBugObj.GetComponent(bugController).startPos					= bugStartPos[bugNumber].transform.position;
	tempBugObj.tag 													= "playerBug";			// set the tag on this object to "Player Bug"
	bugNumber 														+= 1;
	
	// If all 5 have been chosen....
	if (bugNumber == 5)
	{
		ChooseEnemyBugs();
		ChooseEnemyActions();
		EndBugChoosing();
	}
}

function EndBugChoosing(){				// ends this phase
	choosingPanel.SetActive(false);								// Hide the choosing UI panel
	planText.SetActive(true);									// Activate the planning title text
	startButton.SetActive(true);								// Activate the start button
	gameControl.GetComponent(gameController).gamePhase = 2;		// Set phase to 2
	gameControl.GetComponent(gameController).CheckHealthBars();
}

function ChooseEnemyBugs(){
	for(var i : int = 0; i < 5; i++)
    {
    	// Instantiate a random bug to each spot.
    	gameControl.GetComponent(gameController).enemyBug[i] 	= Instantiate(bugPrefab[Random.Range(0,3)], enemyStartPos[i].transform.position, Quaternion.identity);
        var tempEnemyBug										= gameControl.GetComponent(gameController).enemyBug[i];
        var tempHealthBarE												= gameControl.GetComponent(gameController).enemyHealth[i];
		tempHealthBarE.GetComponent(healthBarScript).targetObject		= tempEnemyBug;
		tempHealthBarE.SetActive(true);
        tempEnemyBug.GetComponent(bugController).bugID 			= i;
        tempEnemyBug.GetComponent(bugController).isEnemy		= true;
		tempEnemyBug.tag 										= "enemyBug";			// set the tag on this object to "Player Bug"
    }
    // Activate tower health bars
    gameControl.GetComponent(gameController).playerFlagHealth.SetActive(true);
    gameControl.GetComponent(gameController).enemyFlagHealth.SetActive(true);
}

function ChooseEnemyActions(){
	// TO DO:  Ensure that a bug defending another isn't defending a but that's not attacking/patrolling.  That is, no defend-circles!
	for(var i : int = 0; i < 5; i++)
    {
    	// Instantiate a random bug to each spot.
    	var randomActionNumber = Random.Range(1,7);		// 1 = Attack, 2 = Patrol, 3 = Defend, 4+ = Attack Flag
    	if (randomActionNumber == 1)					// Enemy will attack
    	{
    		var foundEnemyID		= 9;
    		while (foundEnemyID == 9)
    		{
    			var tryThisID	= Random.Range(0,5);
    			var tryThisBug	= gameControl.GetComponent(gameController).playerBug[tryThisID];
    			if (tryThisBug.GetComponent(bugController).health > 0)
    				foundEnemyID		= tryThisID;
    		}
    		planningControl.GetComponent(planningController).EnemyChooseAttack(i, foundEnemyID);			// Pass enemy ID & random player ID
    	}
    	if (randomActionNumber == 2)
    		planningControl.GetComponent(planningController).EnemyChoosePatrol(i, enemyPatrolPos[Random.Range(0,enemyPatrolPos.Length)]);  // Pass enemy ID & Random Patrol Posiion (game object)
    	if (randomActionNumber == 3)
    	{
    		var defendID = i;
    		while (defendID == i)
    			defendID = Random.Range(0,5);		// Choose a new ID #.  If it's still the same as i, will repeat.
    		planningControl.GetComponent(planningController).EnemyChooseDefend(i, defendID); // Pass enemy ID & random enemy ID
    	}
    	if (randomActionNumber >= 4)
    		planningControl.GetComponent(planningController).EnemyChooseFlag(i);		// Pass enemy ID
    }
}



