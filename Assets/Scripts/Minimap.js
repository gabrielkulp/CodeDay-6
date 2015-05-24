#pragma strict

var overlay : Texture;

function Start () {

}

function Update () {
	
}

function OnGUI () {
	GUI.DrawTexture(Rect(Screen.width*.9,Screen.height*.8,Screen.width*.1,Screen.height*.2),overlay,ScaleMode.StretchToFill,true);
}