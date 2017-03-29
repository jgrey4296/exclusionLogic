import _ from 'lodash';

//Symbols:
let BANG = Symbol('BANG'),
    DOT  = Symbol('DOT'),
    QUESTION = Symbol('QUESTION'),
    BIND = Symbol('BIND'),
    RETRACT = Symbol('RETRACT');

export type Trie_t = BANG | DOT; 

class AccessPair {
    constructor(text, trietype=DOT, isVar=false){
        this.text = text;
        this.trietype = trietype;
        this.isVar = isVar;
    }
}

//--------------------
class Base_Instruction {
    constructor(data = []){
        //The location string in the trie
        this.data = data;
        //Any variables used in the string 
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
