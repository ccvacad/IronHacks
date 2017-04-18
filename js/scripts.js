var map;
var markerUniversity;

function initMap(){
	var data = {
		name: 'Department of Computer Science - University of Illinois',
		lat: 41.8708, 
		lon: -87.6505
	}
	map = new google.maps.Map(d3.select("#map").node(), {
  		zoom: 12,
	  	center: new google.maps.LatLng(data.lat, data.lon),
	});

	var icon = {
		url: "img/university.png",
	    scaledSize: new google.maps.Size(42, 42), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor	

	};

	markerUniversity = new google.maps.Marker({ //Line 1
		position: {lat: data.lat, lng: data.lon}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: data.name, //Line 4: Title to be given
		icon: icon
	});

	loadPoints();

};

function loadPoints(){
	$.getJSON("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json ", function (data) {
		for(i in data["data"]){
			var mapData = {
				name : data["data"][i][11],
				addres: data["data"][i][12],
				phone: data["data"][i][14],
				type: data["data"][i][10],
				area: data["data"][i][8],
				number: data["data"][i][16],
				company: data["data"][i][15],
				lat: parseFloat(data["data"][i][19]),
				lon: parseFloat(data["data"][i][20]),
				img: 'https://maps.googleapis.com/maps/api/streetview?' + 'location=' + data["data"][i][12] + '&size=600x300' + '&key=AIzaSyDKNgdNc2Fw6SMLBpcYYIPZr4mbx03w2CQ',
				price: 0
			};
			makePoint(mapData, "img/home-pointer-icon.png");
		}
	});
};

var infWindow;    
var  placesPoints = [];
function makePoint(data, ico){
	var contentString = 
		'<div id="content">'+
      		'<div id="siteNotice">'+
      		'</div>'+
      		'<h5 id="firstHeading" class="firstHeading">' + data.name + '</h5>'+
	      	'<div id="bodyContent">'+
	      		'<img src = "' + data.img + '" width = "200">' + 
	      		'<br><b>Addres: </b>' + data.addres +
	      		'<br><b>Phone: </b>' + data.phone +
	      		'<!-- Trigger the modal with a link -->' +
				'<br><a data-toggle="modal" href="#myModal">More info...</a>' +
	      	'</div>'+
      	'</div>';


    var infowindow = new google.maps.InfoWindow({
    	content: contentString,
    	maxWidth: 250
  	});


	var icon = {
		url: ico,
	    scaledSize: new google.maps.Size(42, 42), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor	

	};
	var marker = new google.maps.Marker({ //Line 1
		position: {lat: data.lat, lng: data.lon}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: data.name, //Line 4: Title to be given
		icon: icon
	});


	marker.addListener('click', function() {
	   	if (infWindow) { infWindow.close();}
        infowindow.open(map, marker);
        infWindow = infowindow;
        document.getElementById("modalName").innerHTML = data.name;
        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalAddres').innerHTML = data.addres;
        document.getElementById('modalPhone').innerHTML = data.phone;
        document.getElementById('modalCompany').innerHTML = data.company;
        document.getElementById('modalType').innerHTML = data.type;
        document.getElementById('modalArea').innerHTML = data.area;
        distance(data.lat, data.lon);
  	});

  	placesPoints.push(marker);
};

function distance(lt, lg){
	var source = {lat: 41.8708, lng: -87.6505};
	var destination = {lat: lt, lng: lg}
	var service = new google.maps.DistanceMatrixService();
	var res;
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            res = distance;
        } else {
            res = "Unable to find the distance via road.";
        }
        document.getElementById('modalDistance').innerHTML = res;
    });
};

function options(){
	if(document.getElementById("crimesOption").checked == true)
		crimes(true);
	else
		crimes(false);
	if(document.getElementById("universityOption").checked == true)
		markerUniversity.setMap(map);
	else
		markerUniversity.setMap(null);

	if(document.getElementById("placesOption").checked == true)
		for(i = 0; i < placesPoints.length; i++)
			placesPoints[i].setMap(map);
	else
		for(i = 0; i < placesPoints.length; i++)
			placesPoints[i].setMap(null);

	if(document.getElementById("priceOption").checked == true);
};

var crimePoints = [];
var crimesHeatMap;

function makePointsCrimes(data){
	var icon = {
		url: "img/iconCrimes.png",
	    scaledSize: new google.maps.Size(42, 42), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor	
	};

	var crimeMarker = new google.maps.Marker({
        position: data.location,
        map: map,
        icon: icon,
        title: data.type
    });

  	crimeMarker.addListener('click', function() {
		new google.maps.InfoWindow({
				content: data.type
		}).open(map, crimeMarker);
	});

	crimePoints.push(crimeMarker);
};

function visibleMarkerPointsCrimes(){
	var state;
	if(document.getElementById("btnCrimesMarker").innerHTML == 'Hide Marker'){
		document.getElementById("btnCrimesMarker").innerHTML = 'Show Marker';
		state = null;
	}
	else{
		document.getElementById("btnCrimesMarker").innerHTML = 'Hide Marker';
		state = map;
	}

	for(i = 0; i < crimePoints.length; i++){
		crimePoints[i].setMap(state);
	}
}

function heatmap(){
	if(document.getElementById("btnHeatMap").innerHTML == 'Hide Heat Map'){
		document.getElementById("btnHeatMap").innerHTML = 'Show Heat Map';
	}
	else
		document.getElementById("btnHeatMap").innerHTML = 'Hide Heat Map';
		toggleHeatmap();
};

function toggleHeatmap() {	
	if(crimesHeatMap != undefined)
		crimesHeatMap.setMap(crimesHeatMap.getMap() ? null : map);
};


function crimes(op){
	if(op){	
		document.getElementById("btnHeatMap").style.visibility = 'visible';
		document.getElementById("btnHeatMap").innerHTML = 'Hide Heat Map'
		document.getElementById("btnCrimesMarker").style.visibility = 'visible';
		document.getElementById("btnCrimesMarker").innerHTML = 'Hide Marker'
		//request places data
		var xmlhttp = new XMLHttpRequest();
		var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json"
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		var locations = [];
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		      	var myArr = xmlhttp.responseText;
		      	var text = myArr;
		      	var json = JSON.parse(text);
		      	for (var i = 0; i<json.length; i++) {
		          	var data = {
		            	type: json[i].primary_type,
		            	location: new google.maps.LatLng(parseFloat(json[i].latitude), parseFloat(json[i].longitude))
		          	};
		          	
		          	makePointsCrimes(data);

		      		if (json[i].latitude != undefined) {
		        		locations.push(data.location);
		      		}
		      	}
		      	crimesHeatMap = new google.maps.visualization.HeatmapLayer({
      				data : locations,
      				map: map
   				});
		    }
		}
	}
	else{
		document.getElementById("btnHeatMap").style.visibility = 'hidden';
		document.getElementById("btnCrimesMarker").style.visibility = 'hidden';
		for(i = 0; i < crimePoints.length; i++){
			crimePoints[i].setMap(null);
		}
		crimePoints = [];
		if(crimesHeatMap != undefined)
			crimesHeatMap.setMap(null);
	}
};