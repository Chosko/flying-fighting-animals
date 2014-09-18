#pragma strict

var hitParticle		: GameObject;
var spawnAudio		: AudioClip;
var damage			: float;
var speed			: float;
var isEnemy			: boolean			= false;
var gameControl		: GameObject;
var mainCamera		: GameObject;
var areaDamage		: boolean			= false;
var areaRadius		: float				= 20.0;
var overlapRadius	: float				= 3.0;

function Start () {
	mainCamera		= GameObject.Find("Top Down Orthograpic Camera");
	gameControl		= GameObject.Find("Game Control");
	var audioToPlay = spawnAudio;
	audio.PlayClipAtPoint(spawnAudio, mainCamera.transform.position);
}

function Update () {
	if (gameControl.GetComponent(gameController).gamePhase == 3)
	{
		var foundAreaEnemy = false;
		var fwd = transform.TransformDirection (Vector3.forward);
		var hit : RaycastHit;
		var shotDistance = Mathf.Max(speed * Time.deltaTime, 1);
		if (Physics.Raycast (transform.position + -transform.forward, fwd, hit, speed * Time.deltaTime)) {
			if ((hit.collider.gameObject.tag == "playerBug" && isEnemy) || (hit.collider.gameObject.tag == "enemyBug" && !isEnemy))
			{
				// Bullet hit something of the opposite team
				if (areaDamage)
				{
					
					var colliders : Collider[] = Physics.OverlapSphere (transform.position, areaRadius);
				    for (var areaHit : Collider in colliders) {
				    	if ((areaHit.collider.gameObject.tag == "playerBug" && isEnemy) || (areaHit.collider.gameObject.tag == "enemyBug" && !isEnemy))
						{
					    	//print ("Area Hit: " + areaHit.collider.gameObject.name);
					    	if (areaHit.collider.gameObject.GetComponent(bugController))		// Was a bug
					    	{
					    		if (areaHit.collider.gameObject.GetComponent(bugController).health > 0)
					    		{
					    			print ("found Hit2: " + areaHit.collider.gameObject.name);
					    			foundAreaEnemy = true;
									areaHit.collider.gameObject.GetComponent(bugController).TakeDamage(damage);
								}
							}
							if (areaHit.collider.gameObject.GetComponent(flagController))	// Was a Flag
							{
								if (areaHit.collider.gameObject.GetComponent(flagController).health > 0)
								{
									print ("found Hit2: " + areaHit.collider.gameObject.name);
									foundAreaEnemy = true;
									areaHit.collider.gameObject.GetComponent(flagController).TakeDamage(damage);
								}
							}
						}
				    }
				    if (foundAreaEnemy)
					    DestroyBullet();
				}
				else
				{
					if (hit.collider.gameObject.GetComponent(bugController))		// Was a bug
					{
						if (hit.collider.gameObject.GetComponent(bugController).health > 0)
						{
							foundAreaEnemy = true;
							hit.collider.gameObject.GetComponent(bugController).TakeDamage(damage);
						}
					}
					if (hit.collider.gameObject.GetComponent(flagController))	// Was a Flag
					{
						if (hit.collider.gameObject.GetComponent(flagController).health > 0)
						{
							hit.collider.gameObject.GetComponent(flagController).TakeDamage(damage);
							foundAreaEnemy = true;
						}
					}
					if (foundAreaEnemy)
						DestroyBullet();
				}
			}
		}
		
		// Overlap Sphere
		/*
		var overlapColliders : Collider[] = Physics.OverlapSphere (transform.position, overlapRadius);
	    for (var overlapHit : Collider in overlapColliders) {
	        if(overlapHit.collider != transform.collider && ((overlapHit.collider.gameObject.tag != "enemyBug" && isEnemy) || (overlapHit.collider.gameObject.tag != "playerBug" && !isEnemy)))
	        {
	        	if (areaDamage)
				{
					var overcolliders : Collider[] = Physics.OverlapSphere (transform.position, areaRadius);
				    for (var overareaHit : Collider in overcolliders) {
				    	if ((overareaHit.collider.gameObject.tag == "playerBug" && isEnemy) || (overareaHit.collider.gameObject.tag == "enemyBug" && !isEnemy))
						{
					    	//print ("Area Hit: " + areaHit.collider.gameObject.name);
					    	if (overareaHit.collider.gameObject.GetComponent(bugController))		// Was a bug
					    	{
					    		if (overareaHit.collider.gameObject.GetComponent(bugController).health > 0)
					    		{
									overareaHit.collider.gameObject.GetComponent(bugController).TakeDamage(damage);
									print ("found Hit: " + overareaHit.collider.gameObject.name);
									foundAreaEnemy = true;
								}
							}
							if (overareaHit.collider.gameObject.GetComponent(flagController))	// Was a Flag
							{	
								if (overareaHit.collider.gameObject.GetComponent(flagController).health > 0)
								{
									foundAreaEnemy = true;
									overareaHit.collider.gameObject.GetComponent(flagController).TakeDamage(damage);
									print ("found Hit: " + overareaHit.collider.gameObject.name);
								}
							}
						}
				    }
				    if (foundAreaEnemy)
				    	DestroyBullet();
				}
				else
				{
					if (overlapHit.collider.gameObject.GetComponent(bugController))		// Was a bug
					{
						if (overlapHit.collider.gameObject.GetComponent(bugController).health > 0)
						{
							foundAreaEnemy = true;
							overlapHit.collider.gameObject.GetComponent(bugController).TakeDamage(damage);
						}
					}
					if (overlapHit.collider.gameObject.GetComponent(flagController))	// Was a Flag
					{
						if (overlapHit.collider.gameObject.GetComponent(flagController).health > 0)
						{
							foundAreaEnemy = true;
							overlapHit.collider.gameObject.GetComponent(flagController).TakeDamage(damage);
						}
					}
					if (foundAreaEnemy)
						DestroyBullet();
				}
			}
	    }*/
	}
}

function DestroyBullet(){
	Instantiate(hitParticle, transform.position, transform.rotation);	
	Destroy(gameObject);
}

