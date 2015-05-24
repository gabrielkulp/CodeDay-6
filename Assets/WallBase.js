#pragma strict

function Start () {

}

function Update () {

}

var hexSpawn:Transform;
var hexObject:GameObject;
var prehexObject:GameObject;

function Erect(){
	Debug.Log("yeah");
	Network.Instantiate(hexObject, hexSpawn.position, hexSpawn.rotation,0); 
}

function PreErect(){
	Debug.Log("ya");
	Network.Instantiate(prehexObject, hexSpawn.position, hexSpawn.rotation, 0);
}