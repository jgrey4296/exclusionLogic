GRAMMAR_DIR = grammar
GEN_DIR = genFiles
SRC_DIR = js

GEN_FILES = ELLexer.js ELLexer.tokens ELListener.js ELParser.js EL.tokens
WRITTEN_FILES = EL_custom_listener.js ELModule.js
GRAMMAR = EL.g4

all : $(GEN_FILES)

compileGrammar :
	java -jar ./lib/antlr-4.5.3-complete.jar -Dlanguage=JavaScript $(GRAMMAR_DIR)/$(GRAMMAR)
	@echo "Moving Generated files"
	@mv $(GRAMMAR_DIR)/*.js $(GEN_DIR)/
	@mv $(GRAMMAR_DIR)/*.tokens $(GEN_DIR)/

$(GEN_FILES) : compileGrammar
	@echo "updating import for" $@
	@perl -pi -e "s/\'antlr4\/index/\'..\/lib\/antlr4_runtime\/index/g" ./$(GEN_DIR)/$@

test : FORCE 
	nodeunit ./unitTests/unitTests.js
	nodeunit ./unitTests/allTests.js

FORCE : 

clean :
	rm $(GEN_FILES:%=$(GEN_DIR)/%)

