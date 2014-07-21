all: build/dom-q.js build/dom-q.min.js

clean:
	rm -rf build

build:
	mkdir -p build

build/dom-q.js: index.js build
	browserify -s domq -o $@ $<

build/dom-q.min.js: build/dom-q.js
	./node_modules/.bin/uglifyjs -o $@ $<

.PHONY: all clean