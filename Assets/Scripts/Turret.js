#pragma strict

var tips : GameObject[];
var rocckette : GameObject;
var deadGO : GameObject;
var health : int;
var lookSpeed : float;
var shootSpeed : float;
var reloadTime : float;
private var coolDown : float;

function FixedUpdate () {
	if (health <= 0)
		Die();
	
	if (coolDown > 0.0)
		coolDown -= Time.deltaTime;
	else
		coolDown = 0.0;
	if (coolDown == 0.0)
		Shoot();
}

function Shoot() {
	for (var i : int = 0; i < tips.Length; i++) {
		var thisShot : GameObject;
		thisShot = GameObject.Instantiate(rocckette, tips[i].transform.position, tips[i].transform.rotation);
		GameObject.Destroy(thisShot, 15.0);
	}
	coolDown = reloadTime;
}

function Die () {
	GameObject.Instantiate(deadGO, transform.position, transform.GetChild(0).rotation);
	GameObject.DestroyObject(this.gameObject);
}