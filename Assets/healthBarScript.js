#pragma strict

var targetObject	: GameObject;
var gameControl		: GameObject;

var yOffsetPercent	: float			= .05;

var targetScreenPos	: Vector2;

var desiredPos		: Vector2;

var mainCamera		: Camera;

var widthPercent	: float			= 0.10;
var heightPercent	: float			= 0.04;
var heightMinimum	: int			= 20;
var widthMinimum	: int			= 50;
var desiredWidth	: float;
var desiredHeight	: float;

function Start () {
	gameControl		= GameObject.Find("Game Control");
	mainCamera = GameObject.Find("Top Down Orthograpic Camera").camera;
	desiredWidth	= Mathf.Max(widthMinimum, Screen.width * widthPercent);
	desiredHeight	= Mathf.Max(heightMinimum, Screen.height * heightPercent);
}

function Update () {
	
	if (targetObject)
	{
		var normalizedHealth	: float;
		if (targetObject.GetComponent(bugController))		// Is a bug
		{
			normalizedHealth = targetObject.GetComponent(bugController).health / targetObject.GetComponent(bugController).maxHealth;
		}
		if (targetObject.GetComponent(flagController))		// Is a flag
		{
			normalizedHealth = targetObject.GetComponent(flagController).health / targetObject.GetComponent(flagController).maxHealth;
		}
		GetComponent(UI.Slider).value = normalizedHealth;
	}
	if (targetObject)
	{
		targetScreenPos = mainCamera.WorldToScreenPoint(targetObject.transform.position);
		desiredPos.x	= -(Screen.width / 2) + targetScreenPos.x;
		desiredPos.y	= (-(Screen.height / 2) + targetScreenPos.y) - (yOffsetPercent * Screen.height);
		GetComponent(RectTransform).anchoredPosition.x = desiredPos.x;
		GetComponent(RectTransform).anchoredPosition.y = desiredPos.y;
		GetComponent(RectTransform).sizeDelta		= Vector2(desiredWidth * normalizedHealth, desiredHeight);
	}
}