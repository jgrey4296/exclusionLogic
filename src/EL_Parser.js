import * as P from 'parsimmon';
import * as ELIs from './EL_Instructions';

//Utility
//Optional whitespace wrapper:
let OWS = {parser} => { return P.optWhitespace.then(parser).skip(P.optWhitespace) },
    //non-optional whitespace sequence
    PWS = { parser } => { return parser.skip(P.whitespace) },
    //Whitespace bookended sequence
    WPW = { parser } => { return P.whitespace.then(parser).skip(P.whitespace); };

//Parsers:

let word = P.regex(/[a-zA-Z_]+/),
    DOT  = P.regex(/\./),
    BANG = P.string('!'),
    QU   = P.string('?'),
    ARR  = P.string('->');

let OPALT = P.alt(DOT,BANG,ARR),
    END = QU.or(P.eof)


let wordSep = P.sepBy(word,P.alt(


//Main parser:
let parser = null;

export { parser };
