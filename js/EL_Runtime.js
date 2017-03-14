import { parser } from './EL_Parser';
import * as ELIs from './EL_Instructions';



class ELBase {
    constructor(artificialRoot){
        if(artificialRoot){
            this.root = artificialRoot;
        }else{
            this.root = new Map();
            this.root.exclusive = ELIs.DOT;
        }
        //the status of current bindings
        this.currentState = new Map();
    }
}

/**
   @param string : A String to parse for actions
*/
ELBase.prototype.parse = function(string,log){
    if(string instanceof Array){
        return string.map(d=>this.parse(d)).reduce(function(m,v){
            return m && v;
        });
    }
    let parseObj = parser(string),
        result = false;
    if(log){
        console.log(parseObj);
    }
    return this.performParse(parseObj);
};

ELBase.prototype.performParse = function(parseObj){
    let result;
    //DECLARATIONS
    if(parseObj instanceof ELIs.Retraction){
        result = this.retract(parseObj);
    }else if(parseObj instanceof ELIs.Assertion){
        result = this.assert(parseObj);
    }else if(parseObj instanceof ELIs.Query){
        //QUERIES
        result = this.query(parseObj);
    }else{
        return false;
    }
    //default return:
    return result;
};


ELBase.prototype.assert = function(assertObj){
    //loop through the data of the obj
    let current = this.root,
        data = _.clone(assertObj.data),
        successStatus = true;
    while(successStatus && data.length > 0){
        let next = data.shift();
        //if starting from a bound point
        if(next instanceof ELIs.RECALL){
            let selected = _.sample(next.data);
            if(!this.currentState.has(selected)){
                throw new Error('unrecognised binding');
            }
            current = this.currentState.get(selected);
        }else if(next instanceof current.exclusive){
            //ex type matches, check for value
            if(next.data instanceof ELIs.RECALL){
                throw new Error("recalls not supported here yet");
            }else if(next.data instanceof ELIs.OPTION){
                //is an option, get a random number of elements?
                throw new Error("numeric options not supported yet");
            }else if(!current.has(next.data)){
                //no value, create
                if(next instanceof ELIs.BANG){
                    current.clear();
                }
                let newMap = new Map();
                newMap.exclusive = ELIs.DOT;
                current.set(next.data,newMap);
            }
            current = current.get(next.data);
            this.bindToCurrentState(next.bind,current);
        }else if(!(next instanceof current.exclusive)){
            //ex type mismatch
            if(next instanceof ELIs.BANG){
                //next is BANG, so current is not. upgrade exclusivity
                current.exclusive = ELIs.BANG;
            }else{
                //next is dot, so current is bang, so complain about downgrade attempt
                successStatus = false;
                break;
            }
            //continue by retrieving or creating:
            let theMap;
            if(current.has(next.data)){
                theMap = current.get(next.data);
            }else{
                theMap = new Map();
                theMap.exclusive = ELIs.DOT;
            }
            current.clear();
            current.set(next.data,theMap);
            current = theMap;
        }else{
            throw new Error("unrecognised instruction");
        }
    }
    return successStatus;            
};


//Return true for successfull retract,
//false if the full retraction wasnt accomplished
ELBase.prototype.retract = function(retractObj){
    //go through each data element, and delete the last
    let current = this.root,
        data = _.clone(retractObj.data),
        successStatus = true;

    while(successStatus && data.length > 1){
        let next = data.shift();
        //RECALL a location:
        if(next instanceof ELIs.RECALL){
            let selected = _.sample(next.data);
            if(!this.currentState.has(selected)){
                throw new Error('unrecognised binding');
            }
            current = this.currentState.get(selected);
        }else if(next instanceof current.exclusive){
            if(current.has(next.data)){
                current = current.get(next.data);
            }else{
                successStatus = false;
            }
        }
    }
    
    //now retract the last thing remaining:
    if(successStatus && data.length === 1 && current.has(data[0].data) && data[0] instanceof current.exclusive){
        //actually retract here:
        //todo: should this need to recursively clear the maps? no, there are no upward links
        current.delete(data[0].data);
        if(current.size === 0){
            //reset to dot if now empty
            current.exclusive = ELIs.DOT;
        }            
    }else{
        successStatus = false;
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


export { ELBase };

