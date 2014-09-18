#pragma strict

var fadeOut				: boolean		= false;
var fadeMultiplier		: float		= 3.0;

function Start () {

}

function Update () {
	if (fadeOut)
	{
		GetComponent(AudioSource).volume = Mathf.MoveTowards(GetComponent(AudioSource).volume, 0, Time.deltaTime * fadeMultiplier);
		if (GetComponent(AudioSource).volume == 0)
		{
			fadeOut = false;
			GetComponent(AudioSource).Stop();
		}
	}
}

function StartMusic(){
	GetComponent(AudioSource).volume = 1;
	GetComponent(AudioSource).Play();
}

function StopMusic(){
	fadeOut	= true;
}