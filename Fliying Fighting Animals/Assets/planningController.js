#pragma strict

var planText		: GameObject;

function Start () {

}

function Update () {

}

function BugSelected(bugID : int){
	print ("Bug #" + bugID + " Selected!");
	planText.GetComponent(UI.Text).text = "Choose a Target";
}