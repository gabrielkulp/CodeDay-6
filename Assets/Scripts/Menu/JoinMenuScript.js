#pragma strict
var canvas : Canvas;
var plainsButton : UnityEngine.UI.Button;
var networkScript : SceneNetworkHandler;

function JoinPlains()
{
	networkScript.JoinScene("Plains");
}

function BackToMenu()
{
	Application.LoadLevel("MainMenu");
}