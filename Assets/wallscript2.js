#pragma strict
var alph:float;
function Start () {
	alph = GetComponent.<Renderer>().material.color.a;
}

function Update () {
	changeAlpha();
//	Debug.Log(alph);
}

var health:float=100;
var maxhealth:float = 100;
var damage:float=10;


function changeAlpha(){
	alph = 0.5;
	Debug.Log("AlphaChanged");
	GetComponent.<Renderer>().material.color.a = alph;
}

function OnCollisionEnter(collision:Collision){
	if (collision.gameObject.tag == "Projectile"){
		health = health - damage;
	}
}

var heal:double = 1;
function Heal(){
	health = health + heal;
	if (health >= maxhealth){
		health = maxhealth;
	}
	else{
		moneyScript.money = moneyScript.money - 5;
	}
}
