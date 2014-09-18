#pragma strict

var speed		: float			= 20.0;

function Start () {

}

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
}