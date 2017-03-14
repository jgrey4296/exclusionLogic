import _ from 'lodash';

class BANG {
    constructor() {
        this.data = [];
        this.bind = [];
    }
}

class DOT {
    constructor() {
        this.data = [];
        this.bind = [];
    }
}

class RECALL {
    constructor() {
        this.data = [];
    }
}

class OPTION {
    contructor(num) {
        this.num = num;
    }
}

//Instructions:--------------------
//Assert a fact
class Assertion {
    constructor() {
        this.data = [];
    }
}

//Retract a fact
class Retraction {
    constructor() {
        this.data = [];
    }
}

//Query for a fact
class Query {
    constructor() {
        this.data = [];
        this.negated = false;
        this.pair = null;
        this.utility = [true, false];
    }
}


export { BANG, DOT, RECALL, OPTION, Assertion, Retraction, Query };
