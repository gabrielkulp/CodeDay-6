#pragma strict

var expo : AnimationCurve;
var maxThrottle : float;
var pitchRate : float;
var rollRate : float;
var yawRate : float;
//var stability : float;


function Start () {

}

function Update () {
	if (GetComponent.<NetworkView>().isMine){
		if (Input.GetAxis("Throttle") != 0.0)	//Prevents startup stupidity
			GetComponent.<Rigidbody>().AddForce(transform.rotation * Vector3.up * (Input.GetAxis("Throttle") + 1) * 0.5 * maxThrottle);
		GetComponent.<Rigidbody>().AddRelativeTorque(Vector3(
		  expo.Evaluate(Input.GetAxis("Pitch")) * pitchRate * 3,
		  expo.Evaluate(Input.GetAxis("Yaw")) * yawRate,
		  expo.Evaluate(Input.GetAxis("Roll")) * rollRate
		  )/* * ((Input.GetAxis("Throttle") + 1) * 0.25 + 0.75)*/);
			
			Debug.Log(Input.GetAxis("Throttle"));
			
			//Stability
			/*
			var torque : Vector3;
			torque = transform.localEulerAngles;
			if (torque.x > 180)
				torque.x -= 360;
			torque.y = 0;
			if (torque.z > 180)
				torque.z -= 360;
			
			GetComponent.<Rigidbody>().AddRelativeTorque(torque * -stability);
			*/
		}
	else{
		SyncedMovement();
		//Remember to instantiate the quad for all players initially so the movement can be synced!
	}
}




//Networking
/*function OnTriggerEnter () {
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
}*/

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
