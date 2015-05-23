#pragma strict

var maxThrottle : float;
var yawRate : float;
var pitchRollRate : float;
//var damping : float;

function Start () {

}

function Update () {
	GetComponent.<Rigidbody>().AddForce(transform.rotation * Vector3.up * Input.GetAxis("Throttle") * maxThrottle * Time.deltaTime);
	GetComponent.<Rigidbody>().AddTorque(Vector3(Input.GetAxis("Pitch") * pitchRollRate, Input.GetAxis("Yaw") * yawRate, Input.GetAxis("Roll") * pitchRollRate) * Time.deltaTime);
	Debug.Log(Input.GetAxis("Throttle"));
}