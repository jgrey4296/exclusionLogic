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

## PREFFERED USAGE:
use make. it will fix imports automatically.

## GENERATED FILES:
ABLLexer.js
ABLLexer.tokens
ABLListener.js
ABLParser.js

## DEV FILES:
JGListener.js

The Listener is written in CommonJS Module format

## USER FILES:
ABLModule.js is a wrapper to easily setup the parser.

##Mental Act Filter:
fileFilter.js in mental_act_filter will preprocess an abl file to tranform all mental_acts into stock "mental_act{}" statements, so that the parser doesnt need to handle full java

##Examples
Example real abl files, simple abl files, preprocessed/mentalAct_Stripped files, and parsed to JSON files, can be found in the examples folder

##Unit Tests
Can be found in js/unitTests. Written using nodeunit.


## Misc ANTLR Notes
rules must start with a non-capital letter
listener rules will capitalise the first letter of a rule for entry and exit
