#pragma strict

var inTurret : boolean;

function Start () 
{

}

function OnTriggerStay (other : Collider) 
{
	if (Input.GetButtonDown("TurretEnter"))
		ToggleTurret(other.gameObject);	
	
}

function ToggleTurret(turret : GameObject)
{
	if(inTurret)
	{
		GetComponent(typeof(HumanMove)).enabled = true;
		GetComponent(typeof(HumanLook)).enabled = true;
		transform.GetChild(0).gameObject.SetActive(true);
		turret.GetComponent(typeof(Turret)).enabled = false;
		turret.transform.GetChild(1).GetChild(0).gameObject.SetActive(false);
	}
	else
	{
		if (turret.GetComponent(typeof(Turret)).enabled)
			return;
		GetComponent(typeof(HumanMove)).enabled = false;
		GetComponent(typeof(HumanLook)).enabled = false;
		transform.GetChild(0).gameObject.SetActive(false);
		turret.GetComponent(typeof(Turret)).enabled = true;
		turret.transform.GetChild(1).GetChild(0).gameObject.SetActive(true);
	}
	inTurret = !inTurret;
}