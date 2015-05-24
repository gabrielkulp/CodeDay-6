using UnityEngine;
using System.Collections;


public class NetworkInstantiate : MonoBehaviour {



	// Use this for initialization
	void Start () {
		if(GetComponent<NetworkView>().isMine) {/*
			if(networkView.GetComponent<Animator>() != null)
				networkView.GetComponent<Animator>().enabled = true;
			if(networkView.GetComponent<Camera>() != null)
				networkView.GetComponent<Camera>().enabled = true;*//*
			if(networkView.GetComponent(Animator) != null)
				networkView.GetComponen(Animator).enabled = true;*/
				if(GetComponent<NetworkView>().GetComponentInChildren<Camera>() != null)
					GetComponent<NetworkView>().GetComponentInChildren<Camera>().enabled = true;
		}
		else {
			name += "Remote";
		}
	}
	
	//Update is called once per frame
	void Update () {
		//Debug.Log (gameObject.camera.GetComponent<Camera>().enabled);
	}
}
