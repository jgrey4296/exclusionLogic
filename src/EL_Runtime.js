import Parser from './EL_Parser';
import * as ELIs from './EL_Instructions';
import _ from 'lodash';

class ELNode {
    constructor(text,trietype=ELIs.DOT){
        this.text = text;
        this.trietype = trietype;
        this.data = new Map();
    }

    setTrieType(tt){
        if (tt == ELIs.BANG){
            this.data.clear()
        }
        this.trietype = trietype;
    }

    has(text){
        return this.data.has(text);
    }
    
    get(text){
        if (this.data.has(text)){
            return this.data.get(text);
        }
        throw new Error('Searching for a non-existent child');
    }
    
    addChild(text,tt){
        if(this.trietype == ELIs.BANG){
            this.data.clear();
        }
        let newNode = new ELNode(text,tt);
        this.data.set(text,newNode);
        return newNode;
    }

    deleteNode(text){
        this.data.delete(text);
    }
}


class ELBase {
    constructor (artificialRoot) {
        if(artificialRoot && artificialRoot instanceof ELNode){
            this.root = artificialRoot;
        }else{
            this.root = new ELNode('root');
        }
        //the status of current bindings
        // currentState :: Array<Map>
        this.currentState = [new Map()];
    }
}

/**
   @param string : A String to parse for actions
*/
ELBase.prototype.parse = function(string,log){
    let parseObj = Parser.parse(string);
    if (log){ console.log(parseObj); }
    if (!parseObj.status){ return false; }
    if ( parseObj.value.length > 0){
        let firstCtor = parseObj.value[0].constructor,
            allSameType = _.every(parseObj.value,(d)=>d instanceof firstCtor);
        if (!allSameType){
            throw new Error('Sequences of parsed strings must be homogenous'); 
        }        
    }    
    return this.performParse(parseObj.value);
};

ELBase.prototype.performParse = function(parseObj){
    let result = false;
    this.currentState.push(new Map());
    //DECLARATIONS
    if(parseObj[0] instanceof ELIs.Retraction){
        result = _.map(parseObj,(d)=>this.retract(d));
    }else if(parseObj[0] instanceof ELIs.Assertion){
        result = _.map(parseObj,(d)=>this.assert(d));
    }else if(parseObj[0] instanceof ELIs.Query){
        //QUERIES
        result = this.query(parseObj);
    }
    //default return:
    this.currentState.pop();
    return result;
};

ELBase.prototype.assert = function(assertObj){
    if (! (assertObj instanceof ELIs.Assertion)){
        throw new Error('Assert requires an Assertion_t');
    }
    
    //loop through the data of the obj
    let current = this.root,
        data = _.clone(assertObj.data),
        parentOfFirstAddition = null,
        successStatus = true;
    while(successStatus && data.length > 0){
        let next = data.shift();
        if(next.isVar){
            //if accessing a bound variable:
            if(!this.currentState.has(next.text)){
                //doesn't have a bound var, so bind?
            }
            current = this.currentState.get(next.text);
            if (current.trietype !== next.trietype){
                successStatus = false;
                break;
            }
        } else {
            if (current.has(next.text)){
                current = current.get(next.text);
                if (current.trietype !== next.trietype){
                    current.setTrieType(next.trietype);
                }
            }else{
                if (parentOfFirstAddition === null){
                    parentOfFirstAddition = current;
                }
                current = current.addChild(next.text,next.trietype);
            }
        }
    }
    //delete from parentOfFirstAddition if failure
    return successStatus;            
};


//Return true for successfull retract,
//false if the full retraction wasnt accomplished
ELBase.prototype.retract = function(retractObj){
    //go through each data element, and delete the last
    let prior = this.root,
        current = this.root,
        data = _.clone(retractObj.data),
        successStatus = true;

    while(successStatus && data.length > 0){
        let next = data.shift();
        //RECALL a location:
        if(next.isVar){
            //if accessing a bound variable:
            if(!this.currentState.has(next.text)){
                //doesn't have a bound var, so bind?
            }
            prior = current;
            current = this.currentState.get(next.text);
            if (current.trietype !== next.trietype){
                successStatus = false;
                break;
            }
        }else{
            if (current.has(next.text)){
                prior = current;
                current = current.data.get(next.text);
                if (current.trietype !== next.trietype){
                    successStatus = false;
                    break;
                }
            }else{
                successStatus = false;
                break;
            }
        }
    }

    //now retract the last thing remaining:
    if (successStatus){
        prior.deleteNode(current.text);
    }
    return successStatus;
};

/**
   Query the EL Fact base for the given sequence
*/
ELBase.prototype.query = function(queryObj){
    let queryStatus = true,
        data = _.clone(queryObj.data),
        current = this.root,
        bindings = {},
        bindAll = d=>{
            d.bind.forEach(e=>{
                bindings[e] = d.data;
                this.currentState.set(e,current);
            })};
    while(queryStatus && data.length > 0){
        let next = data.shift();
        if(next instanceof ELIs.RECALL){
            let selected = _.sample(_.shuffle(next.data));
            if(!this.currentState.has(selected)){
                throw new Error('unrecognised binding');
            }
            current = this.currentState.get(selected);
            continue;//to the next iteration
        }
        //----------
        //Mismatch exclusion type: fail the query
        if(!(next instanceof current.exclusive)){
            queryStatus = false;
            break;
        }
        //selection:
        if(next.data instanceof ELIs.OPTION){
            let selection = _.sampleSize(Array.from(current.keys()),next.data.num),
                selectionObj = _.zipObject(next.bind,selection);
            bindings = _.assign(bindings,selectionObj);
            this.bindObjToCurrentState(selectionObj,current);
            let singleSelection = _.sample(selection);
            if(current.has(singleSelection)){
                this.current = current.get(singleSelection);
            }
        }else if(next.data instanceof ELIs.RECALL){
            let selectionPossibilities = next.data.data,
                selection = _.sample(selectionPossibilities);
            if(this.currentState.has(selection)){
                this.current = this.currentState.get(selection);
            }                
        }else if(current.has(next.data)){
            current = current.get(next.data);
            bindAll(next);
            //next.bind.forEach(bindFunc);
        }else{
            queryStatus = false;
        }
    }

    //Return bindings, false utility, or true utility
    if(queryStatus && _.keys(bindings).length > 0){
        return bindings;
    }else if(queryObj.negated === true){
        if(queryStatus) { return queryObj.utility[1]; }
        return queryObj.utility[0];
    }else if(!queryStatus){
        return queryObj.utility[1];
    }else{
        return queryObj.utility[0];
    }
};

ELBase.prototype.clearState = function(){
    this.currentState = {};
};

ELBase.prototype.bindToCurrentState = function(bindValues,node){
    if(bindValues){
        bindValues.forEach(d=>this.currentState.set(d,node));
    }
};

ELBase.prototype.bindObjToCurrentState = function(bindObj,current){
    _.toPairs(bindObj).forEach(d=>this.currentState.set(d[0],current.get(d[1])));
};


//A DFS, creating a string for every leaf path
ELBase.prototype.toStrings = function(){
    let PATHPOP = Symbol(),
        keyMapStack = [],
        currentPath = [],
        outputStrings = [],
        current,
        toPair = d=>[d,current[1].get(d)];

    keyMapStack.push(["",this.root]);
    while(keyMapStack.length > 0){
        current = keyMapStack.pop();
        if(current === PATHPOP){
            currentPath.pop();
            continue;
        }
        keyMapStack.push(PATHPOP);
        if(current[1].size > 0){
            keyMapStack = keyMapStack.concat(Array.from(current[1].keys()).map(toPair));
            currentPath.push(current[0] + (current[1].exclusive === ELIs.BANG ? '!' : '.'));
        }else{
            currentPath.push(current[0]);
            outputStrings.push(currentPath.join(""));
        }        
    }
    return outputStrings;
};


export default ELBase;
