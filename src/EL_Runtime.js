import { parser } from './EL_Parser';
import * as ELIs from './EL_Instructions';

class EL_Node {
    constructor(name,type){
        this.name = name;
        this.type = type;
    }
}

class EL_Runtime {
    constructor(){
        this.root = new EL_Node('root','DOT');
    }

    // parse ( str : string ) : boolean 
    parse(str){

        return false;
    }

    // assert ( factString : Assertion ) : boolean 
    assert(factString){

    }

    // retract ( factString : Retraction ) : boolean
    retract(factString){

    }

    // query ( factString : Query ) : Mixed
    query(factString){

    }
    
}


export { ELBase };

