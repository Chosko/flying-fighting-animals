#pragma strict

var clickClip		: AudioClip;
var mainCamera		: GameObject;

function Start () {
	mainCamera		= GameObject.Find("Top Down Orthograpic Camera");
}

function PlayClick(){
	audio.PlayClipAtPoint(clickClip, mainCamera.transform.position);
}