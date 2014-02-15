#!/bin/python

import json;
import sys;
import math;
from heapq import heappush, heappop

class Call:
	def __init__(self, c1, c2):
		self.c1 = c1;
		self.c2 = c2;

pairs = {}

if __name__ == "__main__":
	n = 10000;
	heap = [];
	maxTotal = 0;

	for line in sys.stdin:
		tokens = line.split('\t');
		c1 = int(tokens[1]);
		c2 = int(tokens[2]);
		total = float(tokens[3]);
		pair = max(c1, c2), min(c1, c2);
		if pair not in pairs:
			pairs[pair] = 0;
		pairs[pair] += total;

	for pair in pairs:
		total = pairs[pair]
		maxTotal = max(total, maxTotal); 
		if n > 0:
			heappush(heap, (total, pair));
		elif heap[0][0] < total:
			heappop(heap);
			heappush(heap, (total, pair));
		n -= 1;

	calls = []
	for entry in heap:

		call = {}
		call['c1'] = entry[1][0];
		call['c2'] = entry[1][1];

		call['intensity'] = entry[0] / maxTotal;
		calls.append(call);

	print 'calls = ' + json.dumps(calls);


