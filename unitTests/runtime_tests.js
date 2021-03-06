/* jshint esversion : 6 */
"use strict";
var ELRuntime = require('../js/EL_Runtime'),
    _ = require('lodash');

exports.runtime_tests = {

    init : function(test){
        let rt = new ELRuntime();
        test.ok(rt !== undefined);
        test.ok(rt.root !== undefined);
        test.ok(rt.root.exclusive !== undefined);
        test.done();
    },

    assert : function(test){
        let rt = new ELRuntime(),
            successStatus = rt.parse(".this.is.a.test");
        test.ok(successStatus === true);                
        test.done();
    },

    simple_query : function(test){
        let rt = new ELRuntime(),
            successStatus = rt.parse(".this.is.a.test"),
            querySuccess = rt.parse(".this.is.a.test?");
        test.ok(successStatus === true);
        test.ok(querySuccess !== false);
        test.done();
    },

    simple_query_fail : function(test){
        let rt = new ELRuntime(),
            querySuccess = rt.parse(".this.is.a.test?");
        test.ok(querySuccess === false);
        test.done();
    },

    aggregate_declaration_query_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.test");
        rt.parse(".this.is.another.test");

        test.ok(rt.parse(".this.is.a.test?") === true);
        test.ok(rt.parse(".this.is.another?") === true);
        test.ok(rt.parse(".this.is.another.test.that.fails?") === false);
        rt.parse(".this.is.another.test.that.fails");
        test.ok(rt.parse(".this.is.another.test.that.fails?") === true);
        test.done();
    },

    exclusion_check : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.an!exclusive");
        test.ok(rt.parse(".this.is.an!exclusive?") === true);
        test.ok(rt.parse(".this.is.an.exclusive?") === false);        
        test.done();
    },

    exclusion_clear : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob");
        rt.parse(".characters.bill");
        test.ok(rt.parse(".characters.bob?") === true);
        test.ok(rt.parse(".characters.bill?") === true);
        rt.parse(".characters!jill");
        test.ok(rt.parse(".characters.bob?") === false);
        test.ok(rt.parse(".characters.bill?") === false);
        test.ok(rt.parse(".characters.jill?") === false);

        test.ok(rt.parse(".characters!jill?") === true);
        test.done();                
    },

    retract_simple : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob");
        rt.parse(".characters.bill");
        test.ok(rt.parse(".characters.bob?") === true);
        test.ok(rt.parse(".characters.bill?") === true);
        //retract:
        rt.parse("!!.characters.bob");
        test.ok(rt.parse(".characters.bob?") === false);
        test.ok(rt.parse(".characters.bill?") === true);
        test.done();
    },

    retract_with_children : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        rt.parse(".characters.bill.location!cellar");
        test.ok(rt.parse(".characters.bob.location!kitchen?") === true);
        test.ok(rt.parse(".characters.bill.location!cellar?") === true);
        rt.parse("!!.characters.bob.location!kitchen");
        test.ok(rt.parse(".characters.bob.location!kitchen?") === false);
        test.ok(rt.parse(".characters.bob.location?") === true);
        test.ok(rt.parse(".characters.bill.location!cellar?") === true);
        test.done();
    },

    retract_fail : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        rt.parse(".characters.bill.location!cellar");
        test.ok(rt.parse(".characters.bob.location!kitchen?") === true);
        test.ok(rt.parse(".characters.bill.location!cellar?") === true);
        //bad retract:
        let result = rt.parse("!!.characters.bob.location!cellar");
        test.ok(result === false);
        test.ok(rt.parse(".characters.bob.location!kitchen?") === true);
        test.done();
    },

    utility_success_parse : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        let result = rt.parse(".characters.bob.location!kitchen?#2/5");
        test.ok(result === '2');
        test.done();
    },

    utility_fail_parse : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        let result = rt.parse(".characters.bob.location!cellar?#2/5");
        test.ok(result === '5');
        test.done();
    },

    negated_query : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        let resultNormal = rt.parse(".characters.bob.location!kitchen?"),
            resultNegated = rt.parse("!!.characters.bob.location!kitchen?");
        test.ok(resultNormal !== resultNegated);
        
        test.done();
    },

    negated_utility : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        let resultNormal = rt.parse(".characters.bob.location!kitchen?#2/5"),
            resultNegated = rt.parse("!!.characters.bob.location!kitchen?#2/5");
        test.ok(resultNormal === '2');
        test.ok(resultNegated === '5');        
        test.done();
    },

    bind_query_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.location!kitchen");
        rt.parse(".characters.bob.item!knife");
        let bindResult = rt.parse(".characters.bob->x.location!kitchen->y?");
        test.ok(bindResult.x === 'bob');
        test.ok(bindResult.y === 'kitchen');
        test.done();
    },

    multi_bind : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob");
        rt.parse(".characters.bill");
        let bindResult = rt.parse(".characters.[2]->x,y?"),
            values = _.values(bindResult);
        test.ok(values.indexOf('bob') !== -1);
        test.ok(values.indexOf('bill') !== -1);
        test.ok(values.length === 2);
        test.done();
    },

    recall_query_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.items.knife");
        let bindResult = rt.parse(".characters.bob->x?");
        test.ok(bindResult.x === 'bob');
        let furtherResult = rt.parse("${x}.items.knife?");
        test.ok(furtherResult === true);
        test.ok(rt.parse("${x}.items.spoon?") === false);
        test.done();
    },

    recall_assertion_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob->x.items.knife");
        let subAssert = rt.parse("${x}.items.spoon"),
            queryResult1 = rt.parse(".characters.bob.items.spoon?"),
            queryResult2 = rt.parse("${x}.items.spoon?");
        test.ok(queryResult1 === queryResult2);
        test.ok(queryResult1 === true);
        test.done();
    },

    recall_retract_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob->x.items.knife");
        rt.parse("${x}.items.spoon");
        test.ok(rt.parse("${x}.items.spoon"));
        test.ok(rt.parse("${x}.items.knife"));
        //retract:
        rt.parse("!!${x}.items.spoon");
        //check:
        test.ok(rt.parse(".characters.bob.items.spoon?") === false);
        test.ok(rt.parse("${x}.items.spoon?") === false);
        test.ok(rt.parse("${x}.items.knife?") === true);
        test.done();
    },

    toString_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".characters.bob.items.knife");
        rt.parse(".characters.bill.location!kitchen");
        rt.parse(".characters.jill.something");
        rt.parse(".characters.jill.something.else!blah");
        let strings = rt.toStrings();
        test.ok(strings.length === 3);
        test.ok(strings.indexOf(".characters.bob.items.knife") !== -1);
        test.ok(strings.indexOf(".characters.bill.location!kitchen") !== -1);
        test.ok(strings.indexOf(".characters.jill.something.else!blah") !== -1);
        test.done();
    },

    negatedOnEmpty_test : function(test){
        let rt = new ELRuntime();
        test.ok(rt.parse("!!.this.should.fail?") === true);
        test.done();
    },

    multiple_string_parse : function(test){
        let rt = new ELRuntime();
        test.ok(rt.parse([".this.is.a.test",".this.is.another.test"]));
        test.ok(rt.parse([".this.is.a.test?",".this.is.another.test?"]));
        test.done();
    },

    assert_a_number : function(test){
        let rt = new ELRuntime();
        test.ok(rt.parse(".this.is.a.value.10"));        
        test.done();
    },

    assert_negative_number : function(test){
        let rt = new ELRuntime();
        test.ok(rt.parse(".this.is.a.value.-10"));
        test.done();
    },

    query_number : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.22");
        test.ok(rt.parse(".this.is.a.value.22?"));
        test.done();
    },

    query_negative_number : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.-23");
        test.ok(rt.parse(".this.is.a.value.-23?"));
        test.done();
    },

    fail_query_number : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.25");
        test.ok(rt.parse(".this.is.a.value.20?") === false);
        test.done();
    },

    fail_negative_number_query : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.-23");
        test.ok(rt.parse(".this.is.a.value.-21?") === false);
        test.done();
    },

    bind_number_query : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.45");
        let result = rt.parse(".this.is.a.value.[1]->x?");
        test.ok(result !== true);
        test.ok(result !== false);
        test.ok(result.x === 45);
        test.done();
    },

    bind_negative_number_query : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.value.-223");
        let result = rt.parse(".this.is.a.value.[1]->x?");
        test.ok(result.x === -223);
        test.done();
    },

    colour_test : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.colour.#11bb3f");
        let result = rt.parse(".this.is.a.colour.[1]->x?");
        test.ok(result.x === "#11bb3f");
        test.done();
    },

    colour_test_all_digits : function(test){
        let rt = new ELRuntime();
        rt.parse(".this.is.a.colour.#1234524");
        let result = rt.parse(".this.is.a.colour.[1]->x?");
        test.ok(result.x === "#1234524");
        test.done();
    },
    
};
