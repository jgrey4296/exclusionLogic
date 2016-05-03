/* jshint esversion : 6 */
/**
   @module ABLParser
*/
if(typeof define !== 'function'){
    var define = require('amdefine')(module);
}

define(['lodash','../genFiles/ELListener','./EL_Instructions'],function(_,ELListener,ELIs){
    "use strict";
    /**
       The custom listener constructor
       @class EL_Custom_Listener
       @constructor
    */
    var Listener = function(){
        //Not ABLListener.call:
        ELListener.ELListener.call(this);
        //used to build up info
        this.parseStack = [];
        //The main object being created:
        this.parseObj = {
            data : []
        };
        return this;
    };
    //Not ABLListener.prototype, just ABLListener
    //Setup the prototype chain:
    Listener.prototype = Object.create(ELListener.ELListener.prototype);
    Listener.prototype.constructor = Listener;

    Listener.prototype.finish = function(){
        return this.parseObj;
    };
    
    //------------------------------
    //PARSING METHODS:

    Listener.prototype.enterEL_Program = function(ctx){
        
    };

    Listener.prototype.exitEL_Program = function(ctx){
    };
    
    //Create a new instruction
    Listener.prototype.enterEL_Declaration = function(ctx){
        if(ctx.negation() !== null){
            //this.parseObj.action = "retract";
            this.parseObj = new ELIs.Retraction();
        }else{
            //this.parseObj.action = "assert";
            this.parseObj = new ELIs.Assertion();
        }
        //record the current size of the parseStack
        //to know how much to pop off later
        ctx.parseStackSize = this.parseStack.length;
    };

    //take all the stack components, and combine to form the instruction data
    Listener.prototype.exitEL_Declaration = function(ctx){
        let data = [];
        while(this.parseStack.length > ctx.parseStackSize){
            data.unshift(this.parseStack.pop());
        }
        this.parseObj.data = data;
    };

    //Create the recall component
    Listener.prototype.enterSelector = function(ctx){
        this.parseStack.push(new ELIs.RECALL());
    };

    //get the stringlist, set it as the recall data
    Listener.prototype.exitSelector = function(ctx){
        let stringList = this.parseStack.pop();
        _.last(this.parseStack).data = stringList;
    };

    //put an ARRAY of strings on the stack for use
    Listener.prototype.enterStringList = function(ctx){
        let strings = ctx.STRING();
        if(strings instanceof Array){
            this.parseStack.push(ctx.STRING().map(d=>d.getText()));
        }else{
            this.parseStack.push([strings.getText()]);
        }
    };

    //Create a dot or bang component, add it to the stack
    Listener.prototype.enterDotBangPair = function(ctx){
        let dotBang = ctx.DOT() !== null ? new ELIs.DOT() : new ELIs.BANG();
        this.parseStack.push(dotBang);
    };


    Listener.prototype.enterSelection = function(ctx){
        if(ctx.LBRACKET() !== null){
            this.parseStack.push(new ELIs.OPTION(Number(ctx.NUMBER().getText())));
        }else if(ctx.NUMBER() !== null){
            this.parseStack.push(Number(ctx.NUMBER().getText()));
        }else if(ctx.STRING() !== null){
            this.parseStack.push(ctx.STRING().getText());
        }else if(ctx.selector() !== null){
            //no op, exitSelector will deal with it
        }
    };

    //finish up the instruction component 
    Listener.prototype.exitDotBangPair = function(ctx){
        let bindData,selectionData;
        if(ctx.ARROW() !== null){
            //pop the last stringList
            bindData = this.parseStack.pop();
        }
        //pop the selection
        selectionData = this.parseStack.pop();

        let current = _.last(this.parseStack);
        current.bind = bindData || [];
        current.data = selectionData;                        
    };

    //Create a query
    Listener.prototype.enterEL_Query = function(ctx){
        this.parseObj = new ELIs.Query();
        if(ctx.negation() !== null){
            this.parseObj.negated = true;
        }
        ctx.parseStackSize = this.parseStack.length;
    };

    Listener.prototype.exitEL_Query = function(ctx){
        let data = [];
        while(this.parseStack.length > ctx.parseStackSize){
            data.unshift(this.parseStack.pop());
        }
        this.parseObj.data = data;        
    };
    
    //Set a query's return values
    Listener.prototype.enterUtility = function(ctx){
        this.parseObj.utility[0] = ctx.stringOrNum(0).getText();
        this.parseObj.utility[1] = ctx.stringOrNum(1).getText();
    };
    
    return Listener;
});
