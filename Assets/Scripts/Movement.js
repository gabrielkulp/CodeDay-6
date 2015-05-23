#pragma strict

var expo : AnimationCurve;
var maxThrottle : float;
var yawRate : float;
var pitchRollRate : float;
var stability : float;

function Start () {

}

function Update () {
	if (Input.GetAxis("Throttle") != 0.0)	//Prevents startup stupidity
		GetComponent.<Rigidbody>().AddForce(transform.rotation * Vector3.up * (Input.GetAxis("Throttle") + 1) * 0.5 * maxThrottle);
	GetComponent.<Rigidbody>().AddRelativeTorque(Vector3(
	  expo.Evaluate(Input.GetAxis("Pitch")) * pitchRollRate,
	  expo.Evaluate(Input.GetAxis("Yaw")) * yawRate,
	  expo.Evaluate(Input.GetAxis("Roll")) * pitchRollRate
	  ) * ((Input.GetAxis("Throttle") + 1) * 0.25 + 0.75));
	
	
	//Stability
	var torque : Vector3;
	torque = transform.localEulerAngles;
	if (torque.x > 180)
		torque.x -= 360;
	torque.y = 0;
	if (torque.z > 180)
		torque.z -= 360;
	
	GetComponent.<Rigidbody>().AddRelativeTorque(torque * -stability);
}