/* jshint esversion : 6 */

var ExclusionFactBase = function(...strings){
    this.root = new Map();
    strings.forEach(d=>this.assert(d));
};

//Tokenize a string
ExclusionFactBase.prototype.prep = function(string){
    return string.replace(/\./g," $DOT$ ").replace(/!/g," $EX$ ").split(" ").slice(1);
};

//Parse strings into the fact base
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
    
    var tokens = this.prep(strings),
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
    };
    return this;    
};

//test a fact tree of maps for a particular string
ExclusionFactBase.prototype.test = function(...strings){
    "use strict";
    if(strings instanceof Array && strings.length > 1){
        return strings.map(d=>this.test(d)).reduce((m,v)=>m && v,true);
    }else{
        strings = strings.shift();
    }
    
    //Single string:
    var tokens = this.prep(strings),
        current = this.root,
        next;
    
    while(tokens.length > 0){
        next = tokens.shift();
        if(next.match(/\$DOT\$/) && !current.exclusive){
            next = tokens.shift();
            if(current.has(next)){
                current = current.get(next);
            }else{
                return false;
            }
        }else if(next.match(/\$EX\$/) && current.exclusive){
            next = tokens.shift();
            if(current.has(next) && current.size === 1){
                current = current.get(next);
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    return true;
};

//Remove from the fact base a specific pathway
ExclusionFactBase.prototype.retract = function(string){
    "use strict";
    var tokens = this.prep(string),
        current = this.root,
        next;

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

module.exports = ExclusionFactBase;





