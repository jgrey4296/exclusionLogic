import _ from 'lodash';

//Symbols:
let BANG = Symbol('BANG'),
    DOT  = Symbol('DOT'),
    QUESTION = Symbol('QUESTION'),
    BIND = Symbol('BIND'),
    RETRACT = Symbol('RETRACT');

export type Trie_t = BANG | DOT; 

class AccessPair {
    constructor(text,trietype = DOT){
        this.text = text;
        this.trietype = trietype;
    }
}

class Base_Instruction {
    constructor(data = []){
        this.data = data;
        this.bind = [];
    }
}

//Instructions:--------------------
class Assertion  extends Base_Instruction {}
class Retraction extends Base_Instruction {}
class Query      extends Base_Instruction {}

//Exceptions:
class ELException {
    constructor(...vals) {
        this.values = vals;
    }
}

export { BANG, DOT, QUESTION, Assertion, Retraction, Query, AccessPair, ELException };
