#pragma strict

public static var crystalDamage:float =  1000;
var projectileDamage:int;

var rotationDirectionValue:int = 1;
var rotationDirection:Vector3;
var rotationSpeed:double = 50;

function Update(){
	if (crystalDamage <= 0 || PlayerGUI.health <=0){
		Application.LoadLevel("GameOver");
	}
	
	switch (rotationDirectionValue){
		case 0:
		rotationDirection = Vector3.left;
		break;
		case 1:
		rotationDirection = Vector3.right;
		break;
		case 2:
		rotationDirection = Vector3.forward;
		break;
		case 3:
		rotationDirection = Vector3.back;
		break;
	}
	transform.Rotate(rotationDirection*Time.deltaTime*rotationSpeed);
}

function OnCollisionEnter(collision:Collision){
	if (collision.gameObject.tag == "Projectile"){
		crystalDamage -= projectileDamage;
		SyncCrystal(crystalDamage);
	}
}

@RPC
function SyncCrystal(crystalNumber:int){
	crystalDamage = crystalNumber;
}
//This is to ensure that players all have the same data