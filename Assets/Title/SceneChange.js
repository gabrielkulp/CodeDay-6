#pragma strict

function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.Return)){
		Application.LoadLevel("LevelA");
	}
}