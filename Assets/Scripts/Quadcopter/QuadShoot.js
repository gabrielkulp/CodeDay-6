#pragma strict

var guns : GameObject[];
var shot : GameObject;
var shotsPerSec : float;
private var coolDown : float;
private var index : int;

function Start () {

}

function Update () {
	if (coolDown > 0.0)
		coolDown -= Time.deltaTime;
	else
		coolDown = 0.0;
	if (Input.GetAxis("Shoot") && coolDown == 0.0)
		Shoot();
}

function Shoot () {
	Network.Instantiate(shot, guns[index].transform.position, guns[index].transform.rotation);
	index++;
	if (index == guns.Length)
		index = 0;
	coolDown = 1/shotsPerSec;
}