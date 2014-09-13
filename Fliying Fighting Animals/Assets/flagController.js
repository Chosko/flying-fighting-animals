#pragma strict

var isEnemy			: boolean		= false;
var gameControl		: GameObject;
var planningControl	: GameObject;

function Start () {
	gameControl		= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
}

function OnMouseDown () {
	if (gameControl.GetComponent(gameController).gamePhase == 2)						// Only active during planning phase
	{
		if (planningControl.GetComponent(planningController).planPhase	== 1)
		{
			if (isEnemy)
			{
				planningControl.GetComponent(planningController).FlagChosen(gameObject);
			}
		}
	}
}