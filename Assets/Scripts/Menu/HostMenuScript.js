#pragma strict
var canvas : Canvas;
var plainsButton : UnityEngine.UI.Button;
var networkScript : SceneNetworkHandler;

function HostPlains()
{
	networkScript.StartScene("Plains");
}

function BackToMenu()
{
	Application.LoadLevel("MainMenu");
}