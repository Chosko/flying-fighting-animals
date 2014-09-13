#pragma strict

var timeLeft	: float;
var gameControl	: GameObject;

function ResetAndStart(){
	gameControl		= GameObject.Find("Game Control");							// Set the variable Object
	timeLeft		= gameControl.GetComponent(gameController).gameTimeLimit;	// Set the timeLeft to the gameTimeLimit
	GetComponent(UI.Text).text = "" + timeLeft;									// Reset the text
	InvokeRepeating("ChangeTime", 1.0, 1.0);									// Start a repeating function 1 second from now every 1 second
}

function ChangeTime(){
	timeLeft -= 1;									// Subtract 1 from the time left
	GetComponent(UI.Text).text = "" + timeLeft;		// Update the text
	if (timeLeft == 0)								// If we've reached 0
	{
		CancelInvoke("ChangeTime");					// Stop the repeating function
		gameObject.SetActive(false);				// Make this object inactive
	}
}