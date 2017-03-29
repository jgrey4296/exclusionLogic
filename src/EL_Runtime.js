// @flow
import { ELParser } from './EL_Parser';
import * as ELIs from './EL_Instructions';

import type { Trie_t } from './EL_Instructions';

type Result_t = {
    status : boolean,
    bindings : Object
}


class EL_Node {
    constructor(name : string ,type : Trie_t, parent : EL_Node){
        this.name = name;
        this.type = type;
        this.values = new Map();
        this.parent = parent;
    }

    getChild(name : string, type : Trie_t ) : EL_Node {
        if ( !this.values.has(name)){
            throw new ELIs.ELException('{} : No Child {}'.format(self.name,name));
        }
        let result = this.values.get(name);
        if (result.type !== type){
            throw new ELIs.ELException('{} : Incorrect Exclusion Type : {}'.format(this.name,name));
        }
        return result;
    }
}

class EL_Runtime {
    constructor(){
        this.root = new EL_Node('root','DOT');
    }
    
    parse(str : string) :  Result_t {
        let result = ELParser.parse(string);
        if (result.status === False){
            return {
                status: false,
                bindings : []
            }
        }

        let instructions = result.value;
        instructions.forEach(d => {
            if ( d instanceof ELIs.Assertion){
                this.assert(d);
            }else if ( d istanceof ELIs.Retraction){
                this.retract(d);
            }else if (d instanceof ELIs.Query){
                this.query(d);
            }else{
                throw new ELIs.ELException('Unrecognised parse instruction');
            }
        });
        
        
    }

    assert( data : ELIs.Assertion ) : Result_t {

    }

    retract( data : ELIs.Retraction ) : Result_t {

    }

    query( data : ELIs.Query ) : Result_t {

    }
    
}

export { ELBase };

