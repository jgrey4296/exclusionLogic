# Exclusion Logic: an Antlr.js learning experience
An ANTLR 4 based javascript parser for Richard Evan's Exclusion Logic.

## Dependencies:
antlr4,  
antlr4_javascript runtime,  
nodeunit   
amdefine  
lodash

## Grammar Files:
EL.g4  
AblTokens.g4  

## PREFFERED BUILDING METHOD:
use make. it will fix imports automatically.

## Grammar Compilation notes:
For Antlr javascript targeting, it is important to spell the target exactly as `JavaScript`.
Antlr Must Be > v4.5

### Grammar compilation Command:
java -jar ./libs/antlr-4.5.3-complete.jar -Dlanguage=JavaScript ABL.g4

## Fixes:
Generated files need their import statements amended, changing:  
``` import('./antlr4/index') ```  
to:  
```	import('../lib/antlr4_runtime/index') ```  

## Project structure:
The ANTLR runtime takes the .g4 files in ./grammar, and produces the parser and lexer in ./genFiles.
These form the base project, which the EL_custom_listener extends to actually do stuff with the AST. That custom listener is then wrapped in ELModule for easy parsing, and the EL_Runtime packages it all together to use the parsed data in an ExclusionLogic Fact base.

ANTLR is written in CommonJS Module format, while the human written modules in `./js` are written in AMD. (shhh, it makes sense to me).

##Unit Tests
Can be found in `./unitTests`. Written using nodeunit.

## Misc ANTLR Notes
rules must start with a non-capital letter
listener rules will capitalise the first letter of a rule for entry and exit  
See `ctx_ref.org` for notes on how to use the largely undocumented `ctx` object that listener methods are passed by the ANTLR parser.
