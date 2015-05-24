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

function Host()
{
	Application.LoadLevel("HostGame");
}

function Join()
{
	Application.LoadLevel("JoinGame");
}
