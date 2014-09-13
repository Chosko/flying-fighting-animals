#pragma strict

var planText		: GameObject;							// Title text for this phase
var planPhase		: int				= 0;				// 0 = choosing bug, 1 = choosing target
var choosingTarget	: boolean			= false;			// Are we choosing a target?
var currentBug		: GameObject;							// Current bug setting it's target
var gameControl		: GameObject;							
var clickLayerMask	: LayerMask;							// Set to only "Primitives" layer

function Start () {
	gameControl 	= GameObject.Find("Game Control");		// Set this object
}

function Update () {
	if (choosingTarget)
	{
		// Wait for input from player click
		if (Input.GetMouseButtonDown)					// If there's a button down (will work for one finger in touch)
		{
			// Send a ray to the point where the player clicked, looking for a primitive in that spot.
			// If the primitive is not the currently selected but, do the logic for target selection.
		}
	}
}

function BugSelected(bugID : int){
	planText.GetComponent(UI.Text).text = "Choose a Target";						// Change the text to tell player what to do
	currentBug		= gameControl.GetComponent(gameController).playerBug[bugID];	// Set the current bug being selected for
	choosingTarget	= true;															// Tell this script to look for input
}

function DefendBugChosen(bugID : int){
	print ("Bug #" + bugID + " was chosen as a target for bug " + currentBug.name + " to target");
	
}