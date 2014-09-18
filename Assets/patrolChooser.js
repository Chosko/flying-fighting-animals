#pragma strict

var gameControl		: GameObject;
var planningControl	: GameObject;
var cameraObj		: Camera;

function Start () {
	gameControl		= GameObject.Find("Game Control");
	planningControl	= GameObject.Find("Planning Control");
	cameraObj		= GameObject.Find("Top Down Orthograpic Camera").camera;
}

function OnMouseDown () {
	if (gameControl.GetComponent(gameController).gamePhase == 2)						// Only active during planning phase
	{
		if (planningControl.GetComponent(planningController).planPhase	== 1)
		{
			//print ("Mouse Down on " + this.name);
			// Find position on map
			var mapPos : Vector3;										// Setup variable
			var mousePos			= Input.mousePosition;				// Screen Vector2 of touch/click
			//print ("mousePos: " + mousePos);
			// mapPos is the Vector3 of mouse position with the height of the playfield.
			mapPos = cameraObj.ScreenToWorldPoint(mousePos);
			//print ("mapPos: " + mapPos);
			planningControl.GetComponent(planningController).PatrolPosChosen(mapPos);				// Choose this
		}
	}
}