//To be used with mocha --require babel-polyfill --compilers js:babel-register
//Import * as aModule from '../src/aModule';
import * as chai from 'chai';
import * as ELRuntime from '../src/EL_Runtime';

let should = chai.should(),
    expect = chai.expect;

describe ("EL Runtime tests", function() {

    beforeEach(function(){
        this.r = new ELRuntime.ELBase();
    });
    
    afterEach(function(){
        this.r = null;
    });
        
    describe("Runtime Existence", function() {
        it("Should exist", function(){
            expect(this.r).to.exist;
        });

        it("Should be empty to start with", function(){
            this.r.root.size().should.equal(0);
        });

    });

    describe("Assertions",function(){

        it("Should be able to assert a string", function(){
            let testString = ".this.is.a.test",
                result = this.r.parse(testString);
            expect(result).to.exist;
            result.should.be.true;
            this.r.root.data.has('this');
        });

        it("Should be able to handle separate multiple assertions", function(){
            let ts1 = ".this.is.a.test",
                ts2 = ".completely.different.test",
                ts3 = ".this.is.something.else",
                rs1 = this.r.parse(ts1),
                rs2 = this.r.parse(ts2),
                rs3 = this.r.parse(ts3);
            rs1.should.be.true;
            rs2.should.be.true;
            rs3.should.be.true;
        });

        it("Should complain on a bad parse", function(){
            let testString ="this.has.no.starting.dot",
                result = this.r.parse(testString);
            result.should.be.false;
        });

        it("Should not add anything from a bad parse");

        it("Should be able to assert exclusive facts");
        it("Should be able to overwrite exclusive facts automatically");
        it("Should be able to assert mixed exclusive and inclusive facts");
        it("Should be able to upgrade inclusive to exclusive");
        it("Should be able to downgrade exclusive to inclusive");
    });

    describe("Retractions", function() {
        it("Should be able to clear the runtime facts");
        it("Should be able to retract a specific fact");
        it("Should retract all the subfacts of a fact");
        it("Should retract exclusive facts");
        it("Should not retract unrelated facts");
    });

    describe("Queries",function(){
        it("Should be able to query an existing fact");
        it("Should be able to fail on a non-existing fact");
        it("Should be able to query exclusive facts");
        it("Should fail on non-existing exclusive facts");
        it("Should be able to bind results"); //.a.b.$x
        it("Should be able to DFS for chained bindings"); //.a.b.$x.$y
        it("Should be able to return multiple possibilities for bindings");
        it("Should be able to fail on bad binding attempts");
        it("Should fail on rebinding in the same string");
    });

});
