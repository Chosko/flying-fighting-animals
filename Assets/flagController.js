#pragma strict

var explodeParticle		: GameObject;
var isEnemy			: boolean		= false;
var gameControl		: GameObject;
var planningControl	: GameObject;
var health			: float			= 1000;
var maxHealth		: float			= 1000;

function Start () {
	health			= maxHealth;
	gameControl		= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
}

function OnMouseDown () {
	if (gameControl.GetComponent(gameController).gamePhase == 2)							// Only active during planning phase
	{
		if (planningControl.GetComponent(planningController).planPhase	== 1)				// Only when planning phase = 1
		{
			if (isEnemy)																	// If this is an enemy
			{
				planningControl.GetComponent(planningController).FlagChosen(gameObject);	// choose the flag object as target
			}
		}
	}
}

// This takes off damage from health and checks death.
function TakeDamage(damage : float){
	health -= damage;
	if (health <= 0)
		DoDeath();
}

// This destroys the object and asks gameContorl to check the win conditions.
function DoDeath(){
	Instantiate(explodeParticle, transform.position, transform.rotation);
	gameControl.GetComponent(gameController).CheckWinConditions();
	collider.enabled	= false;					// Turn off collider
	renderer.enabled	= false;					// Turn off renderer
}