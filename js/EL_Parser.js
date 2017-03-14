import * as P from 'parsimmon';
import * as ELIs from './EL_Instructions';

//Utility
//Optional whitespace wrapper:
let OWS = {parser} => { return P.optWhitespace.then(parser).skip(P.optWhitespace) },
    //non-optional whitespace sequence
    PWS = { parser } => { return parser.skip(P.whitespace) },
    WPW = { parser } => { return P.whitespace.then(parser).skip(P.whitespace); };

//Parsers:






//Main parser:
let parser = null;

export { parser };
