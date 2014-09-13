#pragma strict

var bugID					: int;
var targetObject			: GameObject;			// Target Object -- Enemy for Attack, Player for Defend
var targetSpot				: Vector3;				// If !targetObject, use targetSpot (map spot) for SetDestination
var shootRadius				: float;				// Distance to target that shoot is possible
var sightRadius				: float;				// When Patroling, sphere around bug, when enemy enters, that's the one we attack
var speed					: float			= 10;	// Speed of movement;
var health					: float			= 100;	// Hit Points
var damage					: float			= 10;	// Damage per successful attack
var attackSpeed				: float			= 1.2;	// Time between attacks

function Start () {

}

function Update () {

}