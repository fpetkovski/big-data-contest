function initialize() {

	var mapOptions = {
		center: new google.maps.LatLng(45.45821407553667, 9.18533669936474),
		zoom: 12
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	for(var i = 0; i < calls.length; i++) {

		var firstCell = grid[calls[i]['c1']];
		var secondCell = grid[calls[i]['c2']];

		var firstLat = firstCell['lat'];
		var firstLon = firstCell['lon'];

		var secondLat = secondCell['lat'];
		var secondLon = secondCell['lon'];
	
		callCoordinates = [
			new google.maps.LatLng(firstLat, firstLon),
			new google.maps.LatLng(secondLat, secondLon)
		];

		var callLine = new google.maps.Polyline({
			path: callCoordinates,
			geodesic: true,
			strokeColor: '#000000',
			strokeOpacity: (calls[i]['intensity'] + 0.1) / 1.1,
			strokeWeight: Math.pow(1 + calls[i]['intensity'], 7)
		});
		
		callLine.setMap(map);
	}

}

google.maps.event.addDomListener(window, 'load', initialize);
