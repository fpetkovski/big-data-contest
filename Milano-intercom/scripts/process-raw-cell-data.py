#!/bin/python

import json
import sys

data = json.load(sys.stdin)

grid = dict();

for feature in data['features']:
	id = feature['id']
	avLon = 0;
	avLat = 0;
	points = feature['geometry']['coordinates'][0];
	for point in points:
		avLon += point[0];
		avLat += point[1];

	avLon = avLon / len(points);
	avLat = avLat / len(points);

	cell = {}
	cell['lon'] = avLon;
	cell['lat'] = avLat;

	grid[id] = cell;

print 'var grid = ' + json.dumps(grid)
