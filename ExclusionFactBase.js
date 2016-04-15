/* jshint esversion : 6 */
"use strict";


/**
   Creates a fact repository / tree
   @constructor
   @param {Array.<String>} the strings to assert on construction
 */
let ExclusionFactBase = function(...strings){
    this.root = new Map();
    this.root.exclusive = false;
    strings.forEach(d=>this.assert(d));
};

ExclusionFactBase.prototype.keys = function(){
    return this.root.keys();
};

/**
   Tokenizes an input string for parsing
   @method
   @param {String} string The string to tokenize based on '.' and '!'
   @returns {Array.<String>} tokens
 */
ExclusionFactBase.prototype.tokenize = function(string){
    return string.replace(/^!!/g," $NOT$ ").replace(/\./g," $DOT$ ").replace(/!/g," $EX$ ").split(" ").slice(1);
};

/**
   Takes fact strings (.place.people.bob!righthanded) and adds them to the fact base
   @method
   @param {Array.<String>} strings The strings to assert
   @returns {ExclusionFactBase}
*/
ExclusionFactBase.prototype.assert = function(...strings){
    "use strict";
    if(strings instanceof Array && strings.length > 1){
        strings.forEach(d=>this.assert(d));
        return this;
    }else{
        strings = strings.shift();
    }
    if(!strings[0].match(/[\.!]/)){
        throw new Error("String should start with a . or !");
    }
    //----------
    let tokens = this.tokenize(strings),
        current = this.root,
        next;

    while(tokens.length > 0){
        next = tokens.shift();
        //Options:
        if(next.match(/\$DOT\$/)){
            next = tokens.shift();
            if(current.has(next) && !current.exclusive){
                //does exist, current is non-exclusive
                current = current.get(next);
            }else if(!current.has(next) && !current.exclusive){
                //doesnt exist
                let newNonExclusion = new Map();
                newNonExclusion.exclusive = false;
                current.set(next,newNonExclusion);
                current = current.get(next);
            }else{
                //doesnt exist, but current is exclusive
                throw new Error(`Trying to assign non-exclusively parent of: ${next} in \n${strings}\n`);
            }
            //Exclusive:
        } else if(next.match(/\$EX\$/)){
            //note: can only move towards higher exclusivity, to move lower, retract and start again
            next = tokens.shift();
            if(current.has(next) && current.exclusive){
                //does exist, current is exclusive
                current = current.get(next);
            }else if(!current.has(next) && current.exclusive){
                //doesnt exist, current is exclusive
                current.clear();
                let newNonExclusion = new Map();
                newNonExclusion.exclusive = false;
                current.set(next,newNonExclusion);
                current = current.get(next);
            }else if(current.has(next) && !current.exclusive){
                //does exist, current is not exclusive -> clear and set exclusivity
                current.clear();
                current.exclusive = true;
                let newNonExclusion = new Map();
                newNonExclusion.exclusive = false;
                current.set(next,newNonExclusion);
                current = current.get(next);
            }else{
                //doesnt exist, isn't exclusive
                current.clear();
                current.exclusive = true;
                let newNonExclusion = new Map();
                newNonExclusion.exclusive = false;
                current.set(next,newNonExclusion);
                current = current.get(next);
            }
        }
    }
    return this;    
};

/**
   Boolean check for if the facts exist in the fact base
   @constructor
   @param {Array.<String>} strings The strings to test the fact base for
   @returns {Boolean} 
 */
//test a fact tree of maps for a particular string
ExclusionFactBase.prototype.exists = function(...strings){
    "use strict";
    if(strings instanceof Array && strings.length > 1){
        return strings.map(d=>this.exists(d)).reduce((m,v)=>m && v,true);
    }else{
        strings = strings.shift();
    }

    // if(!strings[0].match(/[\.!]/)){
    //     throw new Error("String should start with a . or !");
    // }

    
    //Single string:
    let tokens = this.tokenize(strings),
        current = this.root,
        negated = false,
        returnStatus = true,    
        next;

    //peek the head to see if its a NOT:
    if(tokens[0] === "$NOT$"){
        negated = true;
        tokens.shift();
    }
    
    while(tokens.length > 0){
        next = tokens.shift();
        if(next.match(/\$DOT\$/) && !current.exclusive){
            next = tokens.shift();
            if(current.has(next)){
                current = current.get(next);
            }else{
                returnStatus = false;
                break;
            }
        }else if(next.match(/\$EX\$/) && current.exclusive){
            next = tokens.shift();
            if(current.has(next) && current.size === 1){
                current = current.get(next);
            }else{
                returnStatus = false;
                break;
            }
        }else{
            returnStatus = false;
            break;
        }
    }

    if(negated){
        return !returnStatus;
    }else{
        return returnStatus;
    }    
};

/**
   Retracts a single fact chain from the rule base
   @method
   @param {String} string
   @returns {Boolean} the success state of the retraction
   
 */
ExclusionFactBase.prototype.retract = function(string){
    "use strict";
    if(!string[0].match(/[\.!]/)){
        throw new Error("String should start with a . or !");
    }
    
    let tokens = this.tokenize(string),
        current = this.root,
        next;

    //go down the string
    while(tokens.length > 2){
        next = tokens.shift();
        if(next.match(/[(\$DOT\$)(\$EX\$)]/)){
            next = tokens.shift();
            if(current.has(next)){
                current = current.get(next);
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    //final pair:
    next = tokens.shift();
    if(next.match(/[(\$DOT\$)(\$EX\$)]/)){
        next = tokens.shift();
        if(current.has(next)){
            current.delete(next);
            current.exclusive = false;
            return true;
        }else{
            return false;
        }
    }
    return false;
};

/**
   Gets a subtree out of the fact base
   @param {String} string The fact string describe where the subtree starts
   @returns {False || ExclusionFactBase} 
 */
ExclusionFactBase.prototype.retrieve = function(string){
    "use strict";
    let tokens = this.tokenize(string),
        current = this.root,
        next;

    while(tokens.length > 0){
        next = tokens.shift();
        if(next.match(/^[(\$DOT\$)(\$EX\$)]/)){
            next = tokens.shift();
            if(current.has(next)){
                current = current.get(next);
            }else{
                return false;
            }
        }
    }

    let subFactBase = new ExclusionFactBase();
    subFactBase.root = current;
    return subFactBase;    
};


/**
   get the variables possible at the specified depth of the tree
   @param {String} string The location on the tree to inspect
 */
ExclusionFactBase.prototype.optionsAt = function(string){
    "use strict";
    let subTree = this.retrieve(string);
    return Array.from(subTree.keys());
};

/**
   export the fact base as an array of strings
   by doing a dfs on the fact base, keeping track of paths as you go
 */
ExclusionFactBase.prototype.toStrings = function(){
    console.log("Entering toStrings");
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
            currentPath.push(current[0] + (current[1].exclusive ? '!' : '.'));
        }else{
            currentPath.push(current[0]);
            outputStrings.push(currentPath.join(""));
        }        
    }
    return outputStrings;
};


module.exports = ExclusionFactBase;





