function initMap(){
	var lt = 41.8708;
	var lg = -87.6505
	var title = 'Department of Computer Science - University of Illinois'
	var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown
	var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
		center: {lat: lt, lng: lg}, //This is Purdue University's Location
		zoom: 15,
    	mapTypeControlOptions: {
        	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
       		position: google.maps.ControlPosition.LEFT_BOTTOM
    	}
	});
	makePoint(map, lt, lg, title);
}

function makePoint(map, lt, lg, title){
	var marker = new google.maps.Marker({ //Line 1
		position: {lat: lt, lng: lg}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: title //Line 4: Title to be given
	});
}

function displayMenu(){
	var button = document.getElementById('menuButton');
	var menu = document.getElementById('menu');

	if(button.value == 1){
		button.firstChild.data = "X";
		menu.style.visibility = "visible";
		button.style.marginLeft = "270px";
		button.value = 0;
	}
	else{
		button.innerHTML = "&#9776;";
		menu.style.visibility = "hidden";
		button.style.marginLeft = "0px";
		button.value = 1;
	}
}