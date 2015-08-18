#!/usr/bin/env sh
npm i
grunt t
grunt test_orig
grunt test_dist
grunt test_min
grunt
grunt test
npm test
