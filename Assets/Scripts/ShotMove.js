#pragma strict

var speed : float;
var explosion : GameObject;

function FixedUpdate () {
	transform.position += transform.rotation * Vector3.forward * speed * Time.deltaTime;
}

function OnTriggerEnter () {
	GameObject.Instantiate(explosion, transform.position, Quaternion.identity);
	GameObject.Destroy(gameObject);
}