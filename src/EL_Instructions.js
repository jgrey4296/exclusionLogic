import _ from 'lodash';

//Symbols:
let BANG = Symbol('BANG'),
    DOT  = Symbol('DOT'),
    QUESTION = Symbol('QUESTION'),
    //Enums of trie types:
    EX = Symbol('EX'),
    FREE = Symbol('FREE');

class Base_Instruction {
    constructor(){
        this.data = [];
        this.bind = [];
    }

//Instructions:--------------------
class Assertion  extends Base_Instruction {}
class Retraction extends Base_Instruction {}
class Query      extends Base_Instruction {}



export { BANG, DOT, QUESTION, Assertion, Retraction, Query };
