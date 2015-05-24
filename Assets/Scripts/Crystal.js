#pragma strict

var health : int;
var rotateSpeed : float;

function Update(){
	transform.localEulerAngles.z += rotateSpeed * Time.deltaTime;
	if (health <= 0)
		Die();
}

function OnTriggerEnter(other:Collider){
	if (other.tag == "Projectile"){
		health--;
	}
}

function Die () {
	Debug.Log("U DED M8");
	GameObject.Destroy(this.gameObject);
}

function OnGUI () {
	GUI.Box(Rect(0,0,100,20),health.ToString());
}