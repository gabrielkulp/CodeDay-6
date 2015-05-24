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
		
	SyncedMovement();
}

function Shoot() {
	for (var i : int = 0; i < tips.Length; i++) {
		var thisShot : GameObject;
		thisShot = Network.Instantiate(rocckette, tips[i].transform.position, tips[i].transform.rotation, 0);
		thisShot.GetComponent.<Rigidbody>().velocity = thisShot.transform.rotation * Vector3.forward * shootSpeed;
		GameObject.Destroy(thisShot, 15.0);
	}
	coolDown = reloadTime;
}

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
	else
	{
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