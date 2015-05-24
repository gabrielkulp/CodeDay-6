var menuCanvas : Canvas;
var quitButton : UnityEngine.UI.Button;
var hostPlainsButton : UnityEngine.UI.Button;
var joinPlainsButton : UnityEngine.UI.Button;
var networkScript : SceneNetworkHandler; 

function Start() 
{

}

function ExitGame()
{
	Application.Quit();
}

function HostPlains()
{
	networkScript.StartScene("Plains");
}

function JoinPlains()
{
	networkScript.JoinScene("Plains");
}
