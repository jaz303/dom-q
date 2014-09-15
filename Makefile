BUILD_DIR	:= build
PRODUCT		:= dom-q
SRC 		:= index.js async.js sync.js

UMD			:= $(BUILD_DIR)/$(PRODUCT).js
UMD_MIN		:= $(BUILD_DIR)/$(PRODUCT).min.js
UMD_EXPORT	:= domq

TEST_DIR 	:= test
TEST_BUNDLE	:= $(TEST_DIR)/bundle.js
TEST_ENTRY	:= $(TEST_DIR)/main.js
TEST_SRC	:= $(TEST_ENTRY) $(shell find $(TEST_DIR) -name '*.js' | grep -v $(TEST_BUNDLE))

all: $(UMD) $(UMD_MIN) $(TEST_BUNDLE)

clean:
	rm -rf $(BUILD_DIR)
	rm -f $(TEST_BUNDLE)

build:
	mkdir -p $(BUILD_DIR)

sync.js: meta/*.js
	node meta/gen_sync.js > $@

async.js: meta/*.js
	node meta/gen_async.js > $@

$(UMD): $(SRC) $(BUILD_DIR)
	browserify -s $(UMD_EXPORT) -o $@ $<

$(UMD_MIN): $(UMD)
	./node_modules/.bin/uglifyjs -o $@ $<

$(TEST_BUNDLE): $(TEST_SRC) $(SRC)
	browserify -o $@ $<

.PHONY: all clean