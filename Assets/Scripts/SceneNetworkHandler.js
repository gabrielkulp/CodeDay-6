
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {
}

var networkHandler:GameObject;
function JoinScene(level:String){
	Application.LoadLevel(level);
	networkHandler.SendMessage("JoinServer", null);
}

function StartScene(level:String){
	Application.LoadLevel(level);
	networkHandler.SendMessage("StartServer", null);
}
