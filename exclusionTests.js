var EFB = require('./ExclusionFactBase');


module.exports = {

    init : function(test){
        var fb = new EFB();
        test.ok(fb !== undefined);
        test.done();
    },

    simpleAssert : function(test){
        var fb = new EFB();
        fb.assert(".this.is.a.simple.test");
        test.ok(fb.root.get('this').get('is').get('a').get('simple').get('test') !== undefined);
        test.done();
    },

    simpleTest : function(test){
        var fb = new EFB(".this.is.a.simple.test");
        test.ok(fb.test(".this"));
        test.ok(fb.test(".this.is"));
        test.ok(fb.test(".this.is.a"));
        test.ok(fb.test(".this.is.a.simple"));
        test.ok(fb.test(".this.is.a.simple.test"));
        test.done();
    },

    simpleTest_failures : function(test){
        var fb = new EFB(".this.is.a.simple.test");
        test.ok(fb.test(".should.fail") === false);
        test.ok(!fb.test(".this.should.also.fail"));
        test.ok(!fb.test(".blah.blah.blah"));
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
        var fb = new EFB(".this.is.a.fact.base.entry",".this.is.another.fact.base.entry");
        test.ok(fb.test(".this.is.a.fact.base.entry"));
        test.ok(fb.test(".this.is.another.fact.base.entry"));        
        test.done();
    },

    multipleStringsInSingleTest : function(test){
        var fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.test(".this.is.a.fact"));
        test.ok(fb.test(".this.is.another.fact"));
        test.ok(fb.test(".and.a.third.fact"));
        //all together now:
        test.ok(fb.test(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact"));
        test.done();
    },

    multipleStringsInTestWithFailure : function(test){
        var fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.test(".this.is.a.fact"));
        test.ok(fb.test(".this.is.another.fact"));
        test.ok(fb.test(".and.a.third.fact"));
        
        test.ok(!fb.test(".this.is.not.a.fact"));
        test.ok(!fb.test(".this.is.a.fact",".this.is.not.a.fact",".and.a.third.fact"));
        
        test.ok(fb.test("this.is.a.fact",".and.a.third.fact"));
        test.done();
    },

    simpleRetract : function(test){
        var fb = new EFB(".this.is.a.fact");
        test.ok(fb.test(".this.is.a.fact"));
        test.ok(fb.retract(".this.is.a"));
        //still exists:
        test.ok(fb.test(".this.is"));
        //doesnt exist:
        test.ok(!fb.test(".this.is.a"));
        test.ok(!fb.test(".this.is.a.fact"));
        test.done();
    },

    simpleExclusion : function(test){
        var fb = new EFB(".this.is.an!exclusion.test");
        //should fail
        test.ok(!fb.test(".this.is.an.exclusion"));
        //should pass
        test.ok(fb.test(".this.is.an!exclusion"));
        test.ok(fb.test(".this.is.an"));
        test.ok(fb.test(".this.is.an!exclusion.test"));
        test.done();
    },

    nonExclusiveAssignToRetractedExclusive : function(test){
        var fb = new EFB(".this.is.an!exclusive.fact");
        test.ok(fb.test(".this.is.an!exclusive.fact"));

        //try to assign to 'an'
        test.throws(function(){
            fb.assert(".this.is.an.other");
        });

        //retract
        test.ok(fb.retract(".this.is.an!exclusive"));

        //now assign successfully to 'an'
        fb.assert(".this.is.an.other");
        test.ok(fb.test(".this.is.an.other"));
        test.ok(!fb.test("this.is.an!exclusive"));
        test.ok(!fb.test("this.is.an!exclusive.fact"));
        test.done();
    },
    
    
};
