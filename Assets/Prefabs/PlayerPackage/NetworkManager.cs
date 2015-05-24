using UnityEngine;
using System.Collections;

public class NetworkManager : MonoBehaviour
{
	public GUIStyle style;
	private const string typeName = "Drone";
	private const string gameName = "Drone";
	
	private bool isRefreshingHostList = false;
	private HostData[] hostList;
	
	public GameObject dronePrefab;
	public GameObject playerPrefab;
	
	void OnGUI()
	{
		if (!Network.isClient && !Network.isServer)
		{
			if (GUI.Button(new Rect(0, 0, Screen.width, Screen.height/2), "START GAME",style))
				StartServer();
			
			if (GUI.Button(new Rect(0, Screen.height/2, Screen.width, Screen.height/2), "JOIN GAME",style)){
				RefreshHostList();
				if (hostList != null){
					for (int i = 0; i<hostList.Length; i++){
						JoinServer(hostList[i]);
					}
				}
			}
			
			if (hostList != null)
			{
				for (int i = 0; i < hostList.Length; i++)
				{
					//if (GUI.Button(new Rect(400, 100 + (110 * i), 300, 100), hostList[i].gameName))
						//JoinServer(hostList[i]);
				}
			}
		}
	}
	
	private void StartServer()
	{
		Network.InitializeServer(10, 25000, !Network.HavePublicAddress());
		MasterServer.RegisterHost(typeName, gameName);
	}
	
	void OnServerInitialized()
	{
		SpawnDrone();
		Cursor.visible = false;
	}
	
	
	void Update()
	{
		if (isRefreshingHostList && MasterServer.PollHostList().Length > 0)
		{
			isRefreshingHostList = false;
			hostList = MasterServer.PollHostList();
		}
	}
	
	private void RefreshHostList()
	{
		if (!isRefreshingHostList)
		{
			isRefreshingHostList = true;
			MasterServer.RequestHostList(typeName);
		}
	}
	
	
	private void JoinServer(HostData hostData)
	{
		Network.Connect(hostData);
	}
	
	void OnConnectedToServer()
	{
		SpawnPlayer();
	}
	
	
	private void SpawnPlayer()
	{
		Debug.Log ("Andrey is a dumbass");
		Network.Instantiate(playerPrefab, Vector3.up * 20, Quaternion.identity, 0);
	}
	
	private void SpawnDrone()
	{
		Debug.Log ("Andrey is a dumbass");
		Network.Instantiate(dronePrefab, Vector3.up * 5, Quaternion.identity, 0);
	}
	
	void OnDisconnectedFromServer(){
		Cursor.visible = true;
	}
}
