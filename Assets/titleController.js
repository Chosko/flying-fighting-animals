#pragma strict


var titleMusicPrefab		: GameObject;

function Start () {
	var otherTitleMusic = GameObject.Find(titleMusicPrefab.name + "(Clone)");
	if (!otherTitleMusic)
		Instantiate(titleMusicPrefab, transform.position, transform.rotation);
}

function Update () {
	
}

function LoadGame(){
	Application.LoadLevel("Game Scene");
}