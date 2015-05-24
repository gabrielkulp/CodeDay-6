#pragma strict
var spawn:GameObject[];
var randomNumber:int;
var enemy:GameObject;
var spawnTime:float;
var spawnTrigger:float=5f;
var spawnBoolean:boolean=true;

function Update(){
	spawn = GameObject.FindGameObjectsWithTag("Spawn");
	randomNumber = Random.Range(0,spawn.Length+1);
	var pos = spawn[randomNumber].transform.position;
	var rot = spawn[randomNumber].transform.rotation;
	if (spawnBoolean || Time.time - spawnTime >= spawnTrigger){
		Network.Instantiate(enemy, pos, rot,0);
		spawnTime = Time.time;
		spawnBoolean = false;
//		Debug.Log("I'm Loggin");
	}
}
