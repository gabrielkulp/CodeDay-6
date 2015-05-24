#pragma strict

function Update () {
	if (GetComponent.<NetworkView>().isMine){
		InputShoot();
	}
}

var firstFire:boolean = true;
var fireTime:float = 0;
var fireTrigger:float = 0;
var ammo:int = 0;

var animDelay:double = 0;
/* animDelay should be changed only if the animation for shooting
has a delay between animation start and shooting */

function InputShoot(){
	if (Time.time - fireTime >= fireTrigger || firstFire){
		if (Input.GetButton("Fire1")) {
			if (ammo >= 1){
				ammo = ammo - 1;
				//anim.SetBool("Trigger", true); //Use for shooting animation
				Invoke("Shoot", animDelay); 
				fireTime = Time.time;
				firstFire = false;
			}
		}
	}
}


var bullet:GameObject;
var bulletSpawn:Transform;

function Shoot(){
	Network.Instantiate(bullet, bulletSpawn.position, transform.rotation, 0);
}