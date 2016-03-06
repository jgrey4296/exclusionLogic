var EFB = require('./ExclusionFactBase');


module.exports = {

    init : function(test){
        var fb = new EFB();
        test.ok(fb !== undefined);
        test.done();
    },

    simpleAssert : function(test){
        var fb = new EFB();
        fb.assert(".this.is.a.simple.exists");
        test.ok(fb.root.get('this').get('is').get('a').get('simple').get('exists') !== undefined);
        test.done();
    },

    simpleTest : function(test){
        var fb = new EFB(".this.is.a.simple.exists");
        test.ok(fb.exists(".this"));
        test.ok(fb.exists(".this.is"));
        test.ok(fb.exists(".this.is.a"));
        test.ok(fb.exists(".this.is.a.simple"));
        test.ok(fb.exists(".this.is.a.simple.exists"));
        test.done();
    },

    simpleTest_failures : function(test){
        var fb = new EFB(".this.is.a.simple.exists");
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
        var fb = new EFB(".this.is.a.fact.base.entry",".this.is.another.fact.base.entry");
        test.ok(fb.exists(".this.is.a.fact.base.entry"));
        test.ok(fb.exists(".this.is.another.fact.base.entry"));        
        test.done();
    },

    multipleStringsInSingleTest : function(test){
        var fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.exists(".this.is.a.fact"));
        test.ok(fb.exists(".this.is.another.fact"));
        test.ok(fb.exists(".and.a.third.fact"));
        //all together now:
        test.ok(fb.exists(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact"));
        test.done();
    },

    multipleStringsInTestWithFailure : function(test){
        var fb = new EFB(".this.is.a.fact",".this.is.another.fact",".and.a.third.fact");
        test.ok(fb.exists(".this.is.a.fact"));
        test.ok(fb.exists(".this.is.another.fact"));
        test.ok(fb.exists(".and.a.third.fact"));
        
        test.ok(!fb.exists(".this.is.not.a.fact"));
        test.ok(!fb.exists(".this.is.a.fact",".this.is.not.a.fact",".and.a.third.fact"));
        
        test.ok(fb.exists(".this.is.a.fact",".and.a.third.fact"));
        test.done();
    },

    simpleRetract : function(test){
        var fb = new EFB(".this.is.a.fact");
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
        var fb = new EFB(".this.is.an!exclusion.exists");
        //should fail
        test.ok(!fb.exists(".this.is.an.exclusion"));
        //should pass
        test.ok(fb.exists(".this.is.an!exclusion"));
        test.ok(fb.exists(".this.is.an"));
        test.ok(fb.exists(".this.is.an!exclusion.exists"));
        test.done();
    },

    nonExclusiveAssignToRetractedExclusive : function(test){
        var fb = new EFB(".this.is.an!exclusive.fact");
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

    subTreeRetrieval : function(test){
        var fb = new EFB(".this.is.a.set.of.facts",".this.is.another.set.of.facts!subtree1",
                        ".this.is.another.set.of.side.facts!subtree2");
        test.ok(fb.exists(".this.is.a.set.of.facts",".this.is.another.set.of.facts!subtree1"));
        //get the subtree
        var subTree = fb.retrieve(".this.is.another");
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
    
    
};
