#pragma strict

var playerSprite			: GameObject;
var enemySprite				: GameObject;
var spriteObject			: GameObject;
var returnTimer				: float			= 0;
var selectedParticle		: GameObject;
var selectedObject			: GameObject;
var targettedParticle		: GameObject;
var appearParticlePlayer	: GameObject;
var appearParticleEnemy		: GameObject;
var explodeParticle			: GameObject;
var deathAudio				: AudioClip;
var bulletSpawnPos			: GameObject;			// the "Mouth" of the bug
var isEnemy					: boolean;				// Is this bug an enemy bug?
var bugID					: int;
var targetObject			: GameObject;			// Target Object -- Enemy for Attack, Player for Defend
var targetSpot				: Vector3;				// If !targetObject, use targetSpot (map spot) for SetDestination
var shootRadius				: float;				// Distance to target that shoot is possible
var sightRadius				: float;				// When Patroling, sphere around bug, when enemy enters, that's the one we attack
var speed					: float			= 10;	// Speed of movement;
var shootSpeed				: float			= 20.0;	// Speed of bullets
var health					: float			= 100;	// Hit Points
var maxHealth				: float			= 100;	// Hit Points
var damage					: float			= 10;	// Damage per successful attack
var attackSpeed				: float			= 1.2;	// Time between attacks
var bullet					: GameObject;			// Bullet to spawn
var bulletE					: GameObject;			// Bullet to spawn
var bulletP					: GameObject;			// Bullet to spawn
var shootTimer				: float			= 0;	// Timer for shots being fired
var distanceToTarget		: float			= 0;	// How close are we to the target?
var startPos				: Vector3;				// Start position for this bug
var isOnHome				: boolean		= true;	// Are we on the home (start) spot?
var mainCamera				: GameObject;

private var agent: NavMeshAgent;
var gameControl		: GameObject;

function Start () {
	if (appearParticleEnemy && isEnemy)
		Instantiate(appearParticleEnemy, transform.position + (Vector3.up * 10), transform.rotation);
	if (appearParticlePlayer && !isEnemy)
		Instantiate(appearParticlePlayer, transform.position + (Vector3.up * 10), transform.rotation);
	health			= maxHealth;
	mainCamera		= GameObject.Find("Top Down Orthograpic Camera");
	transform.LookAt(Vector3(0,transform.position.y,0));
	ChangeBulletColor(1.0);
	shootTimer			= attackSpeed;
	agent = GetComponent.<NavMeshAgent>();
	agent.stoppingDistance	= shootRadius * 0.9 ;
	print ("Stopping Distance: " + agent.stoppingDistance);
	gameControl = GameObject.Find("Game Control");
	if (enemySprite && playerSprite)
		SetSprite(0.2);
}

function SetSprite(delay : float){
	yield WaitForSeconds(delay);
	if (isEnemy)
		enemySprite.SetActive(true);
	else
		playerSprite.SetActive(true);
}

function ChangeBulletColor(delay : float){
	yield WaitForSeconds(delay);
	if (isEnemy)
		bullet 	= bulletE;
	else
		bullet	= bulletP;
}

function Update () {
	transform.eulerAngles.x	= 0;		// Keep the cube flat
	transform.eulerAngles.z	= 0;		// Keep the cube flat
	if (gameControl.GetComponent(gameController).gamePhase == 3)						// Only active during game phase
	{
		// MOVEMENT
		if (targetObject == null)	//When no target object is selected then the targetSpot should be where it moves
		{
			agent.SetDestination(targetSpot);
		}
		else
		{
			agent.SetDestination(targetObject.transform.position);
		}
		
		// Bug Looking At Target
		if (targetObject && targetObject.tag != gameObject.tag)		// If we have a target and it's not our team
		{
			distanceToTarget	= Vector3.Distance(transform.position, targetObject.transform.position);		// Cache distance
			if (distanceToTarget <= shootRadius)
			{
				var targetLookAt	: Vector3	= targetObject.transform.position;
				targetLookAt.y	= transform.position.y;
				transform.LookAt(targetLookAt);
				agent.updateRotation = false;
			}
			else
			{
				agent.updateRotation = true;
			}
		}
		
		// DEFEND / PATROL SEARCH FOR NEW ENEMY IN RANGE
		if ((targetObject && targetObject.tag == gameObject.tag) || !targetObject)
		{
			//print ("Overlap Sphere : " + sightRadius);
			var colliders : Collider[] = Physics.OverlapSphere (transform.position, sightRadius);
			//print ("Number of Colliders: " + colliders.length);
		    for (var hit : Collider in colliders) {
		        //checks if it's hitting itself
		        if(hit.collider != transform.collider && ((hit.collider.gameObject.tag != "enemyBug" && isEnemy) || (hit.collider.gameObject.tag != "playerBug" && !isEnemy)))
		        {
		        	if (hit.collider.gameObject.GetComponent(bugController))
		        	{
			        	//print ("Found a new target: " + hit.collider.gameObject + " " + hit.collider.gameObject.tag);
			        	// Set New Target
			        	targetObject = hit.collider.gameObject;
			        }
				}
		    }
		}
		
		// SHOOTING
		if (targetObject && health > 0)							// If this bug has a target object
		{
			if (targetObject.tag != gameObject.tag)	// If the targetObject is not the same tag as this
			{
				if (distanceToTarget < shootRadius) // If we are close enough to shoot)
				{
					shootTimer += Time.deltaTime;
					if (shootTimer >= attackSpeed)
					{
						shootTimer = 0;
						Shoot();
					}
				}
			}
		}
		
		// Check for dead target
		if (targetObject)
		{
			if (targetObject.GetComponent(bugController))
			{
				if (targetObject.GetComponent(bugController).health <= 0)
				{
					targetObject 	= null;
					targetSpot		= transform.position;
				}
			}
		}
	}
	else if (gameControl.GetComponent(gameController).gamePhase == 4)						// Only active to move back home
	{
		if (!isOnHome)
		{
			returnTimer	+= Time.deltaTime;
			agent.enabled 		= false;
			var targetDir2	= startPos - transform.position;
			var step2		= speed * Time.deltaTime;
			var newDir2		= Vector3.RotateTowards(transform.forward, targetDir2, step2, 0.0);
			transform.position	= transform.position + (transform.forward * 30 * Time.deltaTime);
			transform.rotation = Quaternion.LookRotation(newDir2);
			
			if (Vector3.Distance(transform.position, startPos) <= .5|| returnTimer >= 10)					// If we're really close
			{
				returnTimer			= 0;
				isOnHome			= true;						// Set that we're ready to go
				transform.position 	= startPos;					// Warp us to position
				agent.enabled 		= false;					// Disable the navMeshAgent
			}
		}
	}
	else if (gameControl.GetComponent(gameController).gamePhase != 5)
	{
		if (health > 0)
			isOnHome	= false;								// Reset this for moving back (phase 4)
		agent.enabled 	= true;									// Enable the NavMeshAgent
		agent.speed		= speed;								// Set to normal speed
		//transform.position = startPos;
		agent.Stop(true);										// Stop movement
		var targetDir	= Vector3(0, transform.position.y, 0) - transform.position;
		var step		= speed * Time.deltaTime;
		var newDir		= Vector3.RotateTowards(transform.forward, targetDir, step, 0.0);
		transform.rotation = Quaternion.LookRotation(newDir);
	}
	else							// GamePhase = 5
		agent.Stop(true);
}

function Shoot(){
	var newBullet 									= Instantiate(bullet, bulletSpawnPos.transform.position, transform.rotation);		// Create bullet
	newBullet.GetComponent(bulletScript).isEnemy 	= isEnemy;					// Set whtehr it's an enemy or player bullet
	newBullet.GetComponent(moveForward).speed 		= shootSpeed;				// Set movement speed of bullet
	newBullet.GetComponent(bulletScript).speed 		= shootSpeed;				// Set movement speed of bullet
	newBullet.GetComponent(bulletScript).damage 	= damage;					// Set damage of bullet
}

// Actions on game start
function StartGame(){
	startPos			= transform.position;
}

// Actions on game end
function EndGame(delay : float){
	yield WaitForSeconds(delay);
}

// Take damage from health and check for death
function TakeDamage(damage : float){
	health -= damage;
	if (health <= 0)
		DoDeath();
}

// Destroy object and check win conditions
function DoDeath(){
	Instantiate(explodeParticle, transform.position, transform.rotation);
	audio.PlayClipAtPoint(deathAudio, mainCamera.transform.position);
	gameControl.GetComponent(gameController).CheckWinConditions();
	collider.enabled	= false;					// Turn off collider
	renderer.enabled	= false;					// Turn off renderer
	bulletSpawnPos.renderer.enabled	= false;		// Turn off renderer
	if (enemySprite && playerSprite)
	{
		enemySprite.SetActive(false);
		playerSprite.SetActive(false);
	}
}

