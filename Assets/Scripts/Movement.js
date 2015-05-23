#pragma strict

var maxThrottle : float;
var yawRate : float;
var pitchRollRate : float;
//var damping : float;

function Start () {

}

function Update () {
	GetComponent.<Rigidbody>().AddForce(transform.rotation * Vector3.up * Input.GetAxis("Throttle") * maxThrottle);
	GetComponent.<Rigidbody>().AddTorque(Input.GetAxis("Pitch") * pitchRollRate, Input.GetAxis("Yaw") * yawRate, Input.GetAxis("Roll") * pitchRollRate);
	Debug.Log(Input.GetAxis("Throttle"));
}