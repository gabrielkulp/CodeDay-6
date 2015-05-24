#pragma strict

//Reticle
var reticleFriend : Texture;
var reticleEnemy : Texture;
var reticleNone : Texture;
var reticleSmall : Texture;
private var hit : RaycastHit;
private var camRay : Ray;
private var reticle : Texture;


//Bars
public static var health : float = 100;

var crystalHealth : float;
var healthBar : Texture;
var healthMin : float;

var crystalBar : Texture;
var spacing : float;
private var healthCalc : float;
var style : GUIStyle;

//Maths
var damageTaken : int = 0;


function FixedUpdate () {
	crystalHealth = crystal.crystalDamage;
	damageTaken = NetworkedMovement.damageTaken;
	health -= damageTaken;
	NetworkedMovement.damageTaken = 0;
}

function OnGUI () {
	
	//Reticles
	GUI.DrawTexture(Rect((Screen.width-reticleSmall.width)/2,(Screen.height-reticleSmall.height)/2,
		reticleSmall.width, reticleSmall.height), reticleSmall);
	
	reticle = reticleNone;
	camRay = Camera.main.ScreenPointToRay(Vector3(Screen.width/2,Screen.height/2,0));
	Physics.Raycast(Camera.main.transform.position,camRay.direction,hit,10000);
	//if (hit.transform.tag == "hexbase")
	//	GUI.Box(Rect(Screen.width/2, Screen.height/2, 0, 0), "PRESS E TO CREATE WALL", style);
	
	
	if (hit.rigidbody) {
		if (hit.transform.tag == "Enemy")
			reticle = reticleEnemy;
		
		if ((hit.transform.tag == "Player") || (hit.transform.tag == "hexo") || (hit.transform.tag == "Finish"))
			reticle = reticleFriend;
	}
	
	
	GUI.DrawTexture(Rect((Screen.width-reticle.width)/2,(Screen.height-reticle.height)/2,
		reticle.width, reticle.height), reticle);
		
	GUI.Box(Rect(spacing,spacing,0,0),"SANITY:" + moneyScript.money.ToString(),style);
	GUI.Box(Rect(spacing,spacing + style.fontSize,0,0),"SCORE:" + moneyScript.score.ToString(),style);
	
	//Bars
	healthCalc = (Mathf.Clamp01((100-health)/100) * (healthBar.width - healthMin)) - spacing;

	GUI.BeginGroup(Rect(spacing, Screen.height - healthBar.height - spacing, healthBar.width - healthCalc, healthBar.height));
		GUI.DrawTexture(Rect(spacing, 0, healthBar.width, healthBar.height), healthBar);
	GUI.EndGroup();
	
	
	GUI.DrawTexture(Rect((Screen.width - (crystalBar.width - (crystalBar.width * Mathf.Clamp01((1000-crystalHealth)/1000))))/2, spacing,
		crystalBar.width - (crystalBar.width * Mathf.Clamp01((1000-crystalHealth)/1000)), crystalBar.height), crystalBar, ScaleMode.ScaleAndCrop, true);
	var range = 10;
	var percent:int = (crystalHealth/1000) * 100;
	GUI.Box(Rect((Screen.width/2)-30,50,0,0),percent.ToString() + "%",style);
	if (Physics.Raycast(camRay,hit,range)){
		if (hit.transform.tag == "hexbase")
			GUI.Box(Rect((Screen.width/2)-240, (Screen.height/2)+125, 0, 0), "PRESS E TO CREATE WALL", style);
	}
}