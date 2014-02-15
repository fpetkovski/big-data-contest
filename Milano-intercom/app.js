Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

function initialize() {

	var mapOptions = {
		mapTypeControlOptions: {
	       mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Edited"] 
		},
		center: new google.maps.LatLng(45.45821407553667, 9.18533669936474),
		zoom: 12
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	

	var stylez = [{
			featureType: "all",
			stylers: [{ hue: "#0000ff" }, { saturation: -75 }]
			},
		{
		    featureType: "poi",
		    elementType: "label",
		    stylers: [{ visibility: "off" }]
	  	}
    ];

	var styledMapType = new google.maps.StyledMapType(stylez, {name: "Edited"});
    map.mapTypes.set("Edited", styledMapType);
    map.setMapTypeId('Edited');

	var total = 0;

	for(var i = 0; i < calls.length; i++) {

		var firstCell = grid[calls[i]['c1']];
		var secondCell = grid[calls[i]['c2']];

		var firstLat = firstCell['lat'];
		var firstLon = firstCell['lon'];

		var secondLat = secondCell['lat'];
		var secondLon = secondCell['lon'];
	
		// Draw call line
		callCoordinates = [
			new google.maps.LatLng(firstLat, firstLon),
			new google.maps.LatLng(secondLat, secondLon)
		];
		total += getDistanceFromLatLonInKm(firstLat, firstLon, secondLat, secondLon);
		var callLine = new google.maps.Polyline({
			path: callCoordinates,
			geodesic: true,
			strokeColor: '#000000',
			strokeOpacity: (calls[i]['intensity'] + 0.1) / 1.1,
			strokeWeight: Math.pow(1 + calls[i]['intensity'], 7)
		});
		callLine.setMap(map);

		if (firstCell['isDrawn'] == 0) {
			firstCell['isDrawn'] = 1;
			// Draw grid circle
			var circle = new google.maps.Circle({
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
				center: new google.maps.LatLng(firstCell['lat'], firstCell['lon']),
				radius: 5
			});	
			circle.setMap(map);
		}

		if (secondCell['isDrawn'] == 0) {
			secondCell['isDrawn'] = 1;
			// Draw grid circle
			var circle = new google.maps.Circle({
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
				center: new google.maps.LatLng(secondCell['lat'], secondCell['lon']),
				radius: 5
			});	
			circle.setMap(map);
		}
	}
}
google.maps.event.addDomListener(window, 'load', initialize);
