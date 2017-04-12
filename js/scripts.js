function initMap(){
	var lt = 41.8708;
	var lg = -87.6505;
	var title = 'Department of Computer Science - University of Illinois';
	var map = new google.maps.Map(d3.select("#map").node(), {
  		zoom: 15,
	  	center: new google.maps.LatLng(lt, lg),
	  	mapTypeId: google.maps.MapTypeId.TERRAIN,
	  	mapTypeControlOptions: {
        	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
       		position: google.maps.ControlPosition.LEFT_BOTTOM
    	}
	});

	loadPoints(map);
	makePoint(map, lt, lg, title, "img/university.png");
}

function loadPoints(map){
	$.getJSON("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json ", function (data) {
		for(i in data["data"]){
			makePoint(map, parseFloat(data["data"][i][19]), parseFloat(data["data"][i][20]), "", "img/home-pointer-icon.png");
		}
	});
}

function makePoint(map, lt, lg, title, ico){
	var icon = {
		url: ico,
	    scaledSize: new google.maps.Size(42, 42), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor	

	};
	var marker = new google.maps.Marker({ //Line 1
		position: {lat: lt, lng: lg}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: title, //Line 4: Title to be given
		icon: icon
	});
}

/*function displayMenu(){
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

/*function loadApp(map){
	// Load the station data. When the data comes back, create an overlay.
	d3.json("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json", function(error, data) {
	  	if (error) throw error;

	  	var overlay = new google.maps.OverlayView();

	  	// Add the container when the overlay is added to the map.
	  	overlay.onAdd = function() {
	    	var layer = d3.select(this.getPanes().overlayLayer).append("div")
	        	.attr("class", "points");
	    	// Draw each marker as a separate SVG element.
	    	// We could use a single SVG, but what size would it have?
	    	overlay.draw = function() {
	     		var projection = this.getProjection(),
	          	padding = 10;

	      		var marker = layer.selectAll("svg")
		          	.data(d3.entries(data["data"]))
		          	.each(transform) // update existing markers
		        	.enter().append("svg")
		          	.each(transform)
		          	.attr("class", "marker");

			    // Add a circle.
			    marker.append("circle")
		          	.attr("r", 4.5)
		          	.attr("cx", padding)
		          	.attr("cy", padding);

			    // Add a label.
			    marker.append("text")
			        .attr("x", padding + 7)
		          	.attr("y", padding)
		          	.attr("dy", ".31em")
		          	.text(function(d) {return d.key; });

			    function transform(d) {
			        d = new google.maps.LatLng(d.value[19], d.value[20]);
			        d = projection.fromLatLngToDivPixel(d);
			        return d3.select(this)
			        	.style("left", (d.x - padding) + "px")
			            .style("top", (d.y - padding) + "px");
			    }
	    	};
	  	};

	  	// Bind our overlay to the map…
	  	overlay.setMap(map);
	});
}*/