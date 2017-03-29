// @flow
import _ from 'lodash';
import * as P from 'parsimmon';
import * as ELIs from './EL_Instructions';

//Types
type SuccResult_t = { status: boolean, value: any };
type FailResult_t = { status: boolean, expected: string[], index: Object };
type Result_t = SuccResult_t | FailResult_t;
type PFunc_t = ((Function) => Function);

//Utility
//Optional whitespace wrapper:
let OWS : PFunc_t = (parser ) => { return P.optWhitespace.then(parser).skip(P.optWhitespace); },
    //non-optional whitespace sequence
    PWS : PFunc_t = (parser) => { return parser.skip(P.whitespace); },
    //Whitespace bookended sequence
    WPW : PFunc_t = (parser) => { return P.whitespace.then(parser).skip(P.whitespace); };

//Parsers:
//Assertion: .a.b.c, .a.b.c!d
//Retraction: -.a.b.c
//Query: .a.b.c?


let text = P.regex(/[a-zA-Z_]+/),
    num = P.regex(/-?[0-9]+(\.[0-9]+)?/).map(Number),
    word = P.alt(text,num),
    DOT  = P.string('.').result(ELIs.DOT),
    BANG = P.string('!').result(ELIs.BANG),
    QU   = P.string('?').result(ELIs.QUESTION),
    ARR  = P.string('->').result(ELIs.BIND);


//something.   something!
let finalWord = word.map(d=>{ return new ELIs.AccessPair(d); }),
    basePair = P.seqMap(word,P.alt(DOT,BANG),(w,tt) => { return new ELIs.AccessPair(w,tt); }),
    //something.something!
    baseStr  = basePair.many(),
    //a.b.c
    assert   = P.seq(baseStr, finalWord).map( seq => { return new ELIs.Assertion(_.flatten(seq)); }),
    //-a.b.c
    retract  = P.string('-').then(P.seq(baseStr,finalWord).map(seq => { return new ELIs.Retraction(_.flatten(seq)); })),
	//a.b.c?
    //todo add negation
    query    = P.seq(baseStr,finalWord).map( seq => { return new ELIs.Query(_.flatten(seq)); }).skip(QU);


//Main parser:
//parser ( input : string ) : Base_Instruction
let ELParser = P.alt(query,retract,assert).many();

export {
    ELParser,
    text,num,word,DOT,BANG,QU,ARR,basePair,
    baseStr, assert, retract, query
};
