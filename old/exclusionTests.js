/* jshint esversion : 6 */
"use strict";
let EFB = require('./ExclusionFactBase');


module.exports = {
    init : function(test){
        let fb = new EFB();
        test.ok(fb !== undefined);
        test.done();
    },

    simpleAssert : function(test){
        let fb = new EFB();
        fb.assert(".this.is.a.simple.exists");
        test.ok(fb.root.get('this').get('is').get('a').get('simple').get('exists') !== undefined);
        test.done();
    },

    simpleTest : function(test){
        let fb = new EFB(".this.is.a.simple.exists");
        test.ok(fb.exists(".this"));
        test.ok(fb.exists(".this.is"));
        test.ok(fb.exists(".this.is.a"));
        test.ok(fb.exists(".this.is.a.simple"));
        test.ok(fb.exists(".this.is.a.simple.exists"));
        test.done();
    },

    simpleTest_failures : function(test){
        let fb = new EFB(".this.is.a.simple.exists");
        test.ok(fb.exists(".should.fail") === false);
        test.ok(!fb.exists(".this.should.also.fail"));
        test.ok(!fb.exists(".blah.blah.blah"));
        test.done();
    },

    simpleComplaintAboutStringFormat : function(test){
        test.throws(function(){
            //no starting '.' or '!'
            new EFB("this.should.fail");
        });
        test.done();
    },

    constructorStringAssertions : function(test){
        let fb = new EFB(".this.is.a.fact.base.entry",".this.is.another.fact.base.entry");
        test.ok(fb.exists(".this.is.a.fact.base.entry"));
        test.ok(fb.exists(".this.is.another.fact.base.entry"));        
        test.done();
    },

    multipleStringsInSingleTest : function(test){
        let fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.exists(".this.is.a.fact"));
        test.ok(fb.exists(".this.is.another.fact"));
        test.ok(fb.exists(".and.a.third.fact"));
        //all together now:
        test.ok(fb.exists(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact"));
        test.done();
    },

    multipleStringsInTestWithFailure : function(test){
        let fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.exists(".this.is.a.fact"));
        test.ok(fb.exists(".this.is.another.fact"));
        test.ok(fb.exists(".and.a.third.fact"));
        
        test.ok(!fb.exists(".this.is.not.a.fact"));
        test.ok(!fb.exists(".this.is.a.fact",".this.is.not.a.fact",".and.a.third.fact"));
        
        test.ok(fb.exists(".this.is.a.fact",".and.a.third.fact"));
        test.done();
    },

    simpleRetract : function(test){
        let fb = new EFB(".this.is.a.fact");
        test.ok(fb.exists(".this.is.a.fact"));
        test.ok(fb.retract(".this.is.a"));
        //still exists:
        test.ok(fb.exists(".this.is"));
        //doesnt exist:
        test.ok(!fb.exists(".this.is.a"));
        test.ok(!fb.exists(".this.is.a.fact"));
        test.done();
    },

    simpleExclusion : function(test){
        let fb = new EFB(".this.is.an!exclusion.exists");
        //should fail
        test.ok(!fb.exists(".this.is.an.exclusion"));
        //should pass
        test.ok(fb.exists(".this.is.an!exclusion"));
        test.ok(fb.exists(".this.is.an"));
        test.ok(fb.exists(".this.is.an!exclusion.exists"));
        test.done();
    },

    nonExclusiveAssignToRetractedExclusive : function(test){
        let fb = new EFB(".this.is.an!exclusive.fact");
        test.ok(fb.exists(".this.is.an!exclusive.fact"));

        //try to assign to 'an'
        test.throws(function(){
            fb.assert(".this.is.an.other");
        });

        //retract
        test.ok(fb.retract(".this.is.an!exclusive"));

        //now assign successfully to 'an'
        fb.assert(".this.is.an.other");
        test.ok(fb.exists(".this.is.an.other"));
        test.ok(!fb.exists(".this.is.an!exclusive"));
        test.ok(!fb.exists(".this.is.an!exclusive.fact"));
        test.done();
    },

    exclusive_override : function(test){
        let fb = new EFB(".bob.location!kitchen");
        test.ok(fb.exists(".bob.location!kitchen"));
        //assert a new location:
        fb.assert(".bob.location!cellar");
        test.ok(fb.exists(".bob.location!cellar"));
        test.ok(!fb.exists(".bob.location!kitchen"));
        test.done();
    },
    
    subTreeRetrieval : function(test){
        let fb = new EFB(".this.is.a.set.of.facts",".this.is.another.set.of.facts!subtree1",
                        ".this.is.another.set.of.side.facts!subtree2");
        test.ok(fb.exists(".this.is.a.set.of.facts",".this.is.another.set.of.facts!subtree1"));
        //get the subtree
        let subTree = fb.retrieve(".this.is.another");
        test.ok(subTree instanceof EFB);
        test.ok(subTree.exists(".set.of.facts!subtree1",".set.of.side.facts!subtree2"));
        //change the original
        test.ok(fb.retract(".this.is.another.set.of"));
        //.this.is.another.set should still exist, but nothing more
        test.ok(!subTree.exists(".set.of.facts!subtree1"));
        //assert in the subtree, have it reflected in the original
        subTree.assert(".something.else!blah");
        test.ok(subTree.exists(".something.else!blah"));
        test.ok(fb.exists(".this.is.another.something.else!blah"));                       
        test.done();
    },

    changingAnExclusiveLiteral : function(test){
        let fb = new EFB(".this.is.an!exclusive");
        fb.assert(".this.is.an!alternative");

        test.ok(!fb.exists(".this.is.an!exclusive"));
        test.ok(fb.exists(".this.is.an!alternative"));
        
        test.done();
    },

    getOptionsAtLocation : function(test){
        let fb = new EFB(".kitchen.people.bob",".kitchen.people.bill",".kitchen.people.jill"),
            characters = fb.optionsAt(".kitchen.people");
        test.ok(characters[0] === "bob");
        test.ok(characters[1] === "bill");
        test.ok(characters[2] === "jill");

        test.ok(fb.exists(`.kitchen.people.${characters[0]}`));
        test.done();
    },

    getExclusiveOptionAtLocation : function(test){
        let fb = new EFB(".bob.location!kitchen"),
            location = fb.optionsAt(".bob.location");
        test.ok(location[0] === 'kitchen');        
        test.done();
    },
    
    ensure_retraction_leaves_other_branches : function(test){
        let fb = new EFB(".kitchen.people.bob",".kitchen.people.bill",".kitchen.people.jill",
                         ".kitchen.items.knife",".kitchen.items.spoon"),
            characters = fb.optionsAt(".kitchen.people"),
            items = fb.optionsAt(".kitchen.items");

        test.ok(characters[0] === 'bob');
        test.ok(characters[2] === 'jill');
        test.ok(items[0] === 'knife');

        fb.retract(".kitchen.people.bob");
        let newChars = fb.optionsAt(".kitchen.people");
        test.ok(newChars[0] === 'bill');
        test.ok(newChars[1] === 'jill');
        fb.retract(".kitchen.people");
        test.ok(fb.exists(".kitchen.items.knife"));
        test.ok(fb.exists(".kitchen.items.spoon"));
        test.done();
    },

    negated_exist_test : function(test){
        let fb = new EFB(".locations.kitchen",".locations.cellar");
        test.ok(fb.exists(".locations.kitchen"));
        test.ok(!fb.exists(".locations.blahhhh"));
        test.ok(fb.exists("!!.locations.blahhhh"));
        test.ok(!fb.exists("!!.locations.kitchen"));
        
        test.done();
    },
    
    allFactsToStringArray : function(test){
        let fb = new EFB(".locations.kitchen",".locations.cellar",
                         ".bob.location!kitchen",
                         ".bill.location!kitchen.temperature!cold",
                         ".bill.location"),
            strings = fb.toStrings();
        test.ok(strings.length === 4);
        test.ok(strings.indexOf(".locations.kitchen") !== -1);
        test.ok(strings.indexOf(".locations.cellar") !== -1);
        test.ok(strings.indexOf(".bob.location!kitchen") !== -1);
        test.ok(strings.indexOf(".bill.location!kitchen.temperature!cold") !== -1);
        test.done();
    },
    
    bind_test : function(test){
        let fb = new EFB(".locations.kitchen",".locations.cellar",
                         ".locations.diningRoom"),
            result = fb.exists(".locations.%1{x}");
        test.ok(typeof result === 'object');
        test.ok(['kitchen','cellar','diningRoom'].indexOf(result.x) !== -1);
        test.done();
    },

    post_bind_test : function(test){
        let fb = new EFB(".locations.kitchen.items.spoon",".locations.cellar.items.wine"),
            result = fb.exists(".locations.%1{x}.items.%1{y}");
        test.ok((result.x === 'kitchen' && result.y === 'spoon')
                || (result.x === 'cellar' && result.y === 'wine'));
        test.done();
    },

    bind_to_array_test : function(test){
        let fb = new EFB(".locations.kitchen",".locations.cellar"),
            result = fb.exists(".locations.%{x}");
        test.ok(result.x instanceof Array);
        test.ok(result.x.length === 2);
        test.ok(result.x.indexOf('kitchen') !== -1);
        test.ok(result.x.indexOf('cellar') !== -1);
        test.done();
    },

    bind_subset_test : function(test){
        let fb = new EFB(".locations.kitchen",".locations.cellar",".locations.bedroom"),
            result = fb.exists(".locations.%2{x}");
        test.ok(result.x instanceof Array);
        test.ok(result.x.length === 2);        
        test.done();
    },
    
    exclusive_mismatch_bind_test : function(test){
        let fb = new EFB(".locations!kitchen"),
            result = fb.exists(".locations.%{x}");
        test.ok(result === false);
        test.done();
    },

    exclusive_bind_test : function(test){
        let fb = new EFB(".locations!kitchen"),
            result = fb.exists(".locations!%{x}");
        test.ok(typeof result === 'object');
        test.ok(result.x === 'kitchen');
        test.done();
    },


    multi_bind_test : function(test){
        let fb = new EFB(".locations!kitchen.items.knife"),
            result = fb.exists(".locations!%{x}.items.%{y}");
        test.ok(result.x === 'kitchen');
        test.ok(result.y === 'knife');
        test.done();
    },
    
    negated_bind_test : function(test){
        let fb = new EFB(".locations.kitchen.items.knife"),
            result = fb.exists("!!.locations.%{x}.items.knife");
        test.ok(result === false);
        
        test.done();
    },

    value_returned_test : function(test){
        let fb = new EFB(".this.is.a.test.fact"),
            result = fb.exists(".this.is.a.test.fact^2/4"),
            result2 = fb.exists(".this.is.not.a.test.fact^2/4");
            
        test.ok(result === "2");
        test.ok(result2 === "4");
        test.done();
    },

    negated_value_return_test : function(test){
        let fb = new EFB(".this.is.a.test.fact"),
            resPASS = fb.exists("!!.this.is.a.test.fact^2/4"),
            resFAIL = fb.exists("!!.this.is.a.fail.test^2/4");
        test.ok(resPASS === "4");
        test.ok(resFAIL === "2");        
        test.done();
    },

    //Possible language additions:
    //definition language
    variational_specification : function(test){
        let specString = ".characters.[bob,bill,jim].gender.male";

        test.done();
    },

    recall_location_specification : function(test){
        let specString = ".characters.bob.$1",
            specString2 = "$1.location.kitchen",
            specString3 = "$1.item.knife";
        
        test.done();
    },

    recombine_specification : function(test){
        let specString = ".characters.[bob,bill,jill].$1",
            specString2 = "$1.location.[kitchen,bathroom,bedroom].$2",
            specString3 = "$2.item.knife";

        test.done();
    },
    
    
    //test language

    pairing_test : function(test){
        let testString = ".characters.${pair:1,2}.likes.${2}?";
        
        test.done();
    },

    group_test : function(test){
        let testString = ".characters.${x:X}.likes.${X}?";
        
        test.done();
    },

    utilityTest : function(test){
        let testString = ".characters.bob.likes.${x}:#${x}.likeValue/0";
        
        test.done();
    },
    
};
