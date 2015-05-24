using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Menu : MonoBehaviour 
{
	public Canvas menuCanvas;
	public Button quitButton;
	public Button loadPlainsButton;
	public Text titleText;

	void Start() 
	{
		menuCanvas = menuCanvas.GetComponent<Canvas>();
		quitButton = quitButton.GetComponent<Button>();
		loadPlainsButton = loadPlainsButton.GetComponent<Button>();
		titleText = titleText.GetComponent<Text>();
	}
	
	public void ExitGame()
	{
		Application.Quit();
	}

	public void LoadPlains()
	{
		Application.LoadLevel(1);
	}
}
