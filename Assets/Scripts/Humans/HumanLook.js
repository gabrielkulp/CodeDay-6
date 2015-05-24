#pragma strict

var cam : GameObject;
private var angles : Vector2;
var lookSpeed : float;
var pitchLimit : Vector2;

function Update () {
	angles.x += Input.GetAxis("LookUp") * lookSpeed;
	angles.y += Input.GetAxis("LookRight") * lookSpeed;
	angles.x = Mathf.Clamp(angles.x, pitchLimit.x, pitchLimit.y);
	if (angles.y > 360)
		angles.y -= 360;
	if (angles.y < -360)
		angles.y += 360;
	
	transform.localEulerAngles.y = angles.y;
	cam.transform.localEulerAngles.x = angles.x;
}