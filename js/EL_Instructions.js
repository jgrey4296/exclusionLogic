if(typeof define !== 'function'){
    var define = require('amdefine')(module);
}


define(['lodash'],function(_){
    "use strict";
    let ELIs = {};

    ELIs.BANG = function(){
        this.data = [];
        this.bind = [];
    };

    ELIs.DOT = function(){
        this.data = [];
        this.bind = [];
    };

    ELIs.RECALL = function(){
        this.data = [];
    };
    
    //Instructions:--------------------
    //Assert a fact
    ELIs.Assertion = function(){
        this.data = [];
    };

    //Retract a fact
    ELIs.Retraction = function(){
        this.data = [];
    };

    //Query for a fact
    ELIs.Query = function(){
        this.data = [];
        this.negated = false;
        this.pair = null;
        this.utility = [true, false];
    };


    return ELIs;
});
