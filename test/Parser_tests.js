//To be used with mocha --require babel-polyfill --compilers js:babel-register
//Import * as aModule from '../src/aModule';
import * as chai from 'chai';
import { ELParser as elp } from '../src/EL_Parser';
import * as ELIs from '../src/EL_Instructions';

let should = chai.should(),
    expect = chai.expect;

describe ("EL Parser tests", function() {

    it("Parser should exist", function(){
        expect(elp).to.exist;
    });

    it("Should be able to handle assertion strings", function(){
        let testString = "this.is.a.test",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.should.be.an.instanceof(ELIs.Assertion);
    });

    it("Should handle retraction strings", function(){
        let testString = "-this.is.a.retraction",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.should.be.an.instanceof(ELIs.Retraction);
    });

    it("Should handle query strings", function(){
        let testString = "this.is.a.query?",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.should.be.an.instanceof(ELIs.Query);
    });

    it("Should be able to handle exclusion ops", function(){
        let testString = "this.is!an.exclusion!op",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
    });

    it("Should be able to handle integers", function(){
        let testString = "this.is.a.number.5",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.data[result.value.data.length-1].text.should.equal(5);
    });


    it("Should be able to handle negative integers", function(){
        let testString = "this.is.a.number.-5",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.data[result.value.data.length-1].text.should.equal(-5);
    });

    
    it("Should be able to handle floats", function(){
        let testString = "this.is.a.number.35.323",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.data[result.value.data.length-1].text.should.equal(35.323);
    });

    it("Should be able to handle negative floats", function(){
        let testString = "this.is.a.number.-35.323",
            result = elp.parse(testString);
        expect(result).to.exist;
        result.status.should.be.true;
        result.value.data[result.value.data.length-1].text.should.equal(-35.323);
    });


    
});
