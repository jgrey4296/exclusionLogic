/* jshint esversion : 6 */
"use strict";

let ELRuntime = require('../js/EL_Runtime'),
    ELSimple = require('../old/ExclusionFactBase');

exports.timingTests = {

    initELRuntime : function(test){
        let el = new ELRuntime();
        test.ok(el !== undefined);
        test.done();
    },

    initELSimple : function(test){
        let els = new ELSimple();
        test.ok(els !== undefined);
        test.done();
    },

    runtime_1000_assertionsAndRetractions : function(test){
        let el = new ELRuntime(),
            start = process.hrtime();

        for(let i = 0; i < 1000; i++){
            el.parse(".this.is.a.test");
            el.parse("!!.this.is.a.test");
        }
        let end = process.hrtime(start);
        console.info("Execution time: %ds %dms",end[0],end[1]/1000000);
        test.done();
    },

    simple_1000_assertionsAndRetractions : function(test){
        let els = new ELSimple(),
            start = process.hrtime();

        for(let i = 0; i < 1000; i++){
            els.assert(".this.is.a.test");
            els.retract(".this.is.a.test");
        }
        let end = process.hrtime(start);
        console.info("Execution time: %ds %dms",end[0],end[1]/1000000);
        test.done();
    },

    runtime_1000_queries : function(test){
        let el = new ELRuntime(),
            start = process.hrtime();
        el.parse(".this.is.a.longer.test");

        for(let i = 0; i < 1000; i++){
            el.parse(".this.is.a.longer.test?");
        }
        let end = process.hrtime(start);
        console.info("Execution time: %ds %dms",end[0],end[1]/1000000);
        test.done();
    },

    
    simple_1000_queries : function(test){
        let els = new ELSimple(),
            start = process.hrtime();
        els.assert(".this.is.a.longer.test");
        for(let i = 0; i < 1000; i++){
            els.exists(".this.is.a.longer.test");
        }        
        let end = process.hrtime(start);
        console.info("Execution time: %ds %dms",end[0],end[1]/1000000);
        test.done();
    },
    
    

};
