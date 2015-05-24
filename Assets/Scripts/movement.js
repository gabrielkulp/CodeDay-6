#pragma strict

var lookSpeed : float;
var moveSpeed : float;
var jumpSpeed : float;
var topSpeed : float;
var MinMaxLook : Vector2;
var canJump : boolean;
var keyboardMove : boolean;
private var camY : float;
private var movement : Vector3;

function Start () {
	Cursor.visible = false;
}

function Update () {
	//Camera Movement
	transform.localEulerAngles.y += Input.GetAxis("Mouse X") * Time.deltaTime * lookSpeed * 10;
	camY += Input.GetAxis("Mouse Y") * Time.deltaTime * -lookSpeed * 10;
	camY = Mathf.Clamp(camY,MinMaxLook.x,MinMaxLook.y);
	Camera.main.transform.localEulerAngles.x = camY;
	Camera.main.transform.localEulerAngles.y = 0;
	Camera.main.transform.localEulerAngles.z = 0;
}

function OnTriggerStay () {
	if (keyboardMove) {
			//Jump Movement
		if ((Input.GetAxis("Jump") == 1) && canJump)
			GetComponent.<Rigidbody>().AddRelativeForce(Vector3(0,jumpSpeed * 100,0));
			
			//Player Movement
		if (GetComponent.<Rigidbody>().velocity.magnitude < topSpeed){
			movement.x = Input.GetAxis("Horizontal");
			movement.z = Input.GetAxis("Vertical");
//			Debug.Log(movement);
			GetComponent.<Rigidbody>().AddRelativeForce(movement * Time.deltaTime * moveSpeed * 1000);
		}
	}
}