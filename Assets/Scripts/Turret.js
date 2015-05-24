#pragma strict

var rotation : Vector2;
var pitchLimits : Vector2;
var yawLimits : Vector2;
var base : GameObject;
var head : GameObject;
var barrel : GameObject;
var tips : GameObject[];
var rocckette : GameObject;
var lookSpeed : float;
var shootSpeed : float;
var reloadTime : float;
private var coolDown : float;

function FixedUpdate () {
	rotation.y += Input.GetAxis("TurretYaw") * lookSpeed * Time.deltaTime;
	rotation.x += Input.GetAxis("TurretPitch") * lookSpeed * Time.deltaTime;
	rotation.y = Mathf.Clamp(rotation.y, yawLimits.x, yawLimits.y);
	rotation.x = Mathf.Clamp(rotation.x, -pitchLimits.y, -pitchLimits.x);
	
	head.transform.localEulerAngles.y = rotation.y;
	barrel.transform.localEulerAngles.x = rotation.x;
	
	if (coolDown > 0.0)
		coolDown -= Time.deltaTime;
	else
		coolDown = 0.0;
	if (Input.GetAxis("TurretShoot") && coolDown == 0.0)
		Shoot();
}

function Shoot() {
	for (var i : int = 0; i < tips.Length; i++) {
		var thisShot : GameObject;
		thisShot = GameObject.Instantiate(rocckette, tips[i].transform.position, tips[i].transform.rotation);
		thisShot.GetComponent.<Rigidbody>().velocity = thisShot.transform.rotation * Vector3.forward * shootSpeed;
		GameObject.Destroy(thisShot, 15.0);
	}
	coolDown = reloadTime;
}