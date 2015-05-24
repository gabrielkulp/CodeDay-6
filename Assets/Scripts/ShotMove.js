#pragma strict

var speed : float;
var explosion : GameObject;

function FixedUpdate () {
	transform.position += transform.rotation * Vector3.forward * speed * Time.deltaTime;
}

function OnTriggerEnter (other : Collider) {
	var thisExplosion : GameObject;
	thisExplosion = GameObject.Instantiate(explosion, transform.position, Quaternion.identity);
	GameObject.Destroy(thisExplosion, 2.0);
	GameObject.Destroy(gameObject);
	if (other.tag == "Turret") {
		if (other.GetComponent.<Turret>())
			other.GetComponent.<Turret>().health--;
	}
}