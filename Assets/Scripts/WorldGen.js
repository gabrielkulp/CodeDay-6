#pragma strict

var size : Vector2;
var center : Vector3;
var heightMinMax : Vector2;
var sideLength : float;
var spacing : float;
var blockSize : int;
var box : GameObject;
var streets : int;

function Start () {
	Initialize();
}

function Update () {
//	if (Input.GetAxis("Reset"))
//		Application.LoadLevel(Application.loadedLevel);
}

function Initialize () {
	var time : float = Time.realtimeSinceStartup;
	transform.position = Vector3(-size.x/2,0,-size.y/2) + center;
	//Make ground
	GameObject.CreatePrimitive(PrimitiveType.Cube).transform.parent = transform;
	transform.GetChild(0).transform.position = center - (Vector3.up * 0.5);
	transform.GetChild(0).transform.localScale = Vector3(size.x * 1.1, 1, size.y * 1.1);
	//Make buildings
	var xCount : int = 0;
	var yCount : int;
	for (var x : float = spacing/2; x < size.x; x += spacing + sideLength) {
		xCount++;
		yCount = 0;
		if (xCount%(blockSize+1) != 0) {
			for (var y : float = spacing/2; y < size.y; y += spacing + sideLength) {
				yCount++;
				if (yCount%(blockSize+1) != 0) {
					var building : GameObject;
					building = GameObject.Instantiate(box);
					building.transform.parent = transform;
					var height : float;
					height = Random.Range(heightMinMax.x,heightMinMax.y);
					building.transform.localPosition = Vector3(x,height/2,y);
					building.transform.localScale = Vector3(sideLength, height, sideLength);
				}
			}
		}
	}
	//Make streets
	for (var i : int = 0; i < streets; i++) {
		var ray : Ray;
		ray.origin = PerimeterPoint(size, center);
		ray.direction = PerimeterPoint(size, center) - ray.origin;
		var hit : RaycastHit[];
		hit = Physics.RaycastAll(ray,size.magnitude);
		for (var h : int = 0; h < hit.Length; h++) {
			GameObject.Destroy(hit[h].transform.gameObject);
		}
	}
	Debug.Log("World created in " + Mathf.Round((Time.realtimeSinceStartup - time) * 1000)/1000 + " seconds");
}

function PerimeterPoint (size : Vector2, center : Vector3) {
	var origin : Vector3;
	var c : int;
	c = Random.Range(0,4);	//0 is z+, 1 is x+, 2 is z-, 3 is x-
	if (c==0) {
		origin.x = center.x + Random.Range(-size.x/2,size.x/2);
		origin.z = center.z + (size.y/2);
	}
	if (c==1) {
		origin.x = center.x + (size.x/2);
		origin.z = center.z + Random.Range(-size.y/2,size.y/2);
	}
	if (c==2) {
		origin.x = center.x + Random.Range(-size.x/2,size.x/2);
		origin.z = center.z - (size.y/2);
	}
	if (c==3) {
		origin.x = center.x - (size.x/2);
		origin.z = center.z + Random.Range(-size.y/2,size.y/2);
	}
	if (c==4)
		Debug.Log("Waaat");
	origin.y = center.y;
	return origin;
}