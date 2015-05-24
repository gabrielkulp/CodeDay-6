#pragma strict

var speed : float;
private var cc : CharacterController;

function Start () {
	cc = GetComponent.<CharacterController>();
}

function Update () {
	cc.SimpleMove(transform.rotation * Vector3(Input.GetAxis("Strafe"),0,Input.GetAxis("Walk")) * speed);
}