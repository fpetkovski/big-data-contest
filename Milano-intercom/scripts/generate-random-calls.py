#!/bin/python

import json;
import sys;
from random import randint
 
if len(sys.argv) != 2:
	print "Usage: " + sys.argv[0] + " <number of calls>";
	exit(-1);

calls = []

interval = 24;


for i in range(0, int(sys.argv[1])):
	call = {};
	call['c1'] = randint(0, 9999);
	call['c2'] = randint(0, 9999); 

	call['interval'] = randint(0, interval);
	call['intensity'] = randint(1, 500);

	calls.append(call);

print 'calls = ' + json.dumps(calls)

