#pragma strict

var explosion : GameObject;

function FixedUpdate () {
	transform.rotation = Quaternion.LookRotation(GetComponent.<Rigidbody>().velocity, Vector3.up);
}

function OnTriggerEnter (other : Collider) {
	if (other.tag != "Turret") {
		var thisExplosion : GameObject;
		thisExplosion = GameObject.Instantiate(explosion, transform.position, Quaternion.identity);
		GameObject.Destroy(thisExplosion, 2.0);
		GameObject.Destroy(gameObject);
	}
}