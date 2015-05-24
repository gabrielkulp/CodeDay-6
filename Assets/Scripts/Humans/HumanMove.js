#pragma strict

var speed : float;
private var cc : CharacterController;

function Start () {
	if (GetComponent.<NetworkView>().isMine){
		cc = GetComponent.<CharacterController>();
	}
}

function Update () {
	if (GetComponent.<NetworkView>().isMine){
		cc.SimpleMove(transform.rotation * Vector3(Input.GetAxis("Strafe"),0,Input.GetAxis("Walk")) * speed);
	}else{
		SyncedMovement();
	}
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

