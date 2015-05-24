#pragma strict

var firstFire:boolean = true;
var fireTime:float = 0;
var fireTrigger:float = 5;
var ammo = 100;
var sphere:GameObject;
function Start () {
	Cursor.visible = false;
}

function Update () {
		Cursor.visible = false;
	if (GetComponent.<NetworkView>().isMine){
		sphere.layer = 9;
		InputShoot();
		CameraMovement();
		if (keyboardMove) {
				//Jump Movement
			if ((Input.GetAxis("Jump") == 1) && canJump && onGround)
				GetComponent.<Rigidbody>().AddRelativeForce(Vector3(0,jumpSpeed * 10,0));
			
				//Player Movement
			if (GetComponent.<Rigidbody>().velocity.magnitude < topSpeed){
				movement.x = Input.GetAxis("Horizontal");
				movement.z = Input.GetAxis("Vertical");
				GetComponent.<Rigidbody>().AddRelativeForce((movement * Time.deltaTime * currentSpeed * 1000));
			} else {
				GetComponent.<Rigidbody>().velocity.x -= GetComponent.<Rigidbody>().velocity.x * 0.05;
				GetComponent.<Rigidbody>().velocity.z -= GetComponent.<Rigidbody>().velocity.z * 0.05;
			}
		}
	}
	else{
		SyncedMovement();
	}	
}

function LateUpdate () {
//	damageTaken = 0;
}

//Character Functions and Variables

var lookSpeed : float;
var moveSpeed : float;
var flySpeed : float;
var jumpSpeed : float;
var topSpeed : float;
var canJump : boolean;
var keyboardMove : boolean;
var cam : GameObject;
private var currentSpeed : float = moveSpeed;
private var onGround : boolean;
private var camY : float;
private var movement : Vector3;

var range:double = 10;

var moneyDamage:int = 1;
var wallHeal:int = 0.1;

var hit: RaycastHit;
var ray: Ray;

function CameraMovement () {
	transform.localEulerAngles.y += Input.GetAxis("Mouse X") * Time.deltaTime * lookSpeed * 10;
	camY += Input.GetAxis("Mouse Y") * Time.deltaTime * -lookSpeed * 10;
	camY = Mathf.Clamp(camY,-90,90);
	cam.transform.localEulerAngles.x = camY;
	cam.transform.localEulerAngles.y = 0;
	cam.transform.localEulerAngles.z = 0;
}

function OnTriggerEnter () {
	if (GetComponent.<NetworkView>().isMine){
	currentSpeed = moveSpeed;
	onGround = true;
	}
}

function OnTriggerExit () {
	if (GetComponent.<NetworkView>().isMine){
	currentSpeed = flySpeed;
	onGround = false;
	}
}

function InputShoot(){
	if (Time.time - fireTime >= fireTrigger || firstFire){
		if (Input.GetButton("Fire1")) {
			if (ammo >= 1){
				ammo = ammo - 1;
				fireTime = Time.time;
				firstFire = false;
			}
		}
	}
}


var bullet:GameObject;
var bulletSpawn:Transform;

function Shoot(){
	Network.Instantiate(bullet, bulletSpawn.position, bulletSpawn.rotation, 0);
}


var health:int = 100;
var damage:int = 10;
public static var damageTaken:int = 0;
var item:int= 10;
var hitSound:AudioClip;
var itemSound:AudioClip;

function OnCollisionEnter(collision:Collision){
	if (GetComponent.<NetworkView>().isMine){
		if (collision.gameObject.tag == "Projectile"){
			damageTaken = damageTaken + damage;
			GetComponent.<AudioSource>().PlayOneShot(hitSound);
		}
		if (collision.gameObject.tag == "HealthItem"){
			damageTaken = damageTaken - item;
			GetComponent.<AudioSource>().PlayOneShot(itemSound);
		}
		if (collision.gameObject.tag == "AmmoItem"){
			ammo = ammo + item;
			GetComponent.<AudioSource>().PlayOneShot(itemSound);
		}
	}
}


/*
function OnTriggerStay () {
	if (keyboardMove && networkView.isMine) {
			//Jump Movement
		if ((Input.GetAxis("Jump") == 1) && canJump)
			rigidbody.AddRelativeForce(Vector3(0,jumpSpeed * 100,0));
			
			//Player Movement
		if (rigidbody.velocity.magnitude < topSpeed){
			movement.x = Input.GetAxis("Horizontal");
			movement.z = Input.GetAxis("Vertical");
//			Debug.Log(movement);
			rigidbody.AddRelativeForce(movement * Time.deltaTime * currentSpeed * 1000);
		}
	}
}
*/

//Networking Functions and Variables

var lastSynchronizationTime:float = 0f;
var syncDelay:float = 0f;
var syncTime:float = 0f;
var syncStartPosition:Vector3 = Vector3.zero;
var syncEndPosition:Vector3 = Vector3.zero;
var syncStartRotation:Quaternion;
var syncEndRotation:Quaternion;
var syncStartCRotation:Quaternion;
var syncEndCRotation:Quaternion;
var CRotation:Transform;

function OnSerializeNetworkView(stream:BitStream, info:NetworkMessageInfo){ //Serializing Variables
	var syncPosition:Vector3 = Vector3.zero;
	var syncRotation:Quaternion;
	var syncCRotation:Quaternion;
	var receivePlayState:boolean = false;
	var receiveAnimID = 0;
	
	if (stream.isWriting)
	{	
		syncPosition = GetComponent.<Rigidbody>().position;
		syncRotation = transform.rotation;
		syncCRotation = CRotation.rotation;
		stream.Serialize(syncPosition);
		stream.Serialize(syncRotation);
		stream.Serialize(syncCRotation);
	}
	else{
		stream.Serialize(syncPosition);
		stream.Serialize(syncRotation);
		stream.Serialize(syncCRotation);
		stream.Serialize(receivePlayState);
		stream.Serialize(receiveAnimID);
		
		syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
 
     	syncStartPosition = GetComponent.<Rigidbody>().position;
     	syncEndPosition = syncPosition;
     	
     	syncStartRotation = transform.rotation;
     	syncEndRotation = syncRotation;
     	
     	syncStartCRotation = CRotation.rotation;
     	syncEndCRotation = syncCRotation;
	}
}

private function SyncedMovement(){
	syncTime += Time.deltaTime;
	GetComponent.<Rigidbody>().position = Vector3.Lerp(syncStartPosition, syncEndPosition, syncTime / syncDelay);
	transform.rotation = Quaternion.Lerp(syncStartRotation, syncEndRotation, syncTime / syncDelay);
	CRotation.rotation = Quaternion.Lerp(syncStartCRotation, syncEndCRotation, syncTime / syncDelay);
}
