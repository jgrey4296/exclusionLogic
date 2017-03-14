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

    parse(string){

        return false;
    }
    
    assert(factString){

    }

    retract(factString){

    }

    query(factString){

    }
    
}


export { ELBase };

