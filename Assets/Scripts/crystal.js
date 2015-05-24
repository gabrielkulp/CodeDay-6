#pragma strict


public static var crystalDamage:float =  1000;

@script RequireComponent(AudioSource)
function Update(){
	GetComponent.<AudioSource>().volume = (1000/crystalDamage) - 1;
	Debug.Log(1000/crystalDamage);
	if (crystalDamage <= 0 || PlayerGUI.health <=0){
		Application.LoadLevel("GameOver");
	}
	
}

function OnCollisionEnter(collision:Collision){
	Debug.Log("entered");
	if (collision.gameObject.tag == "Projectile"){
		crystalDamage -= 5;
		SyncCrystal(crystalDamage);
	}
}

@RPC
function SyncCrystal(crystalNumber:int){
	crystalDamage = crystalNumber;
}