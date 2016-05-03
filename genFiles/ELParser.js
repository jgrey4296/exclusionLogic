// Generated from grammar/EL.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('../ANTLR.min');
var ELListener = require('./ELListener').ELListener;
var grammarFileName = "EL.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\u0012r\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0003",
    "\u0002\u0003\u0002\u0005\u0002\u001b\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0005\u0003 \n\u0003\u0003\u0003\u0005\u0003#\n\u0003\u0003",
    "\u0003\u0003\u0003\u0007\u0003\'\n\u0003\f\u0003\u000e\u0003*\u000b",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0005\u00053\n\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0005\u0007?\n\u0007\u0003\u0007\u0003\u0007\u0005",
    "\u0007C\n\u0007\u0003\u0007\u0005\u0007F\n\u0007\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0007\bL\n\b\f\b\u000e\bO\u000b\b\u0005\bQ\n\b\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\n\u0005\nX\n\n\u0003\n\u0005\n[\n\n\u0003\n",
    "\u0005\n^\n\n\u0003\n\u0003\n\u0007\nb\n\n\f\n\u000e\ne\u000b\n\u0003",
    "\n\u0003\n\u0005\ni\n\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\f\u0003\f\u0003\f\u0002\u0002\r\u0002\u0004\u0006",
    "\b\n\f\u000e\u0010\u0012\u0014\u0016\u0002\u0004\u0003\u0002\u0004\u0005",
    "\u0003\u0002\u0011\u0012w\u0002\u001a\u0003\u0002\u0002\u0002\u0004",
    "\u001f\u0003\u0002\u0002\u0002\u0006+\u0003\u0002\u0002\u0002\b.\u0003",
    "\u0002\u0002\u0002\n4\u0003\u0002\u0002\u0002\fE\u0003\u0002\u0002\u0002",
    "\u000eP\u0003\u0002\u0002\u0002\u0010R\u0003\u0002\u0002\u0002\u0012",
    "W\u0003\u0002\u0002\u0002\u0014j\u0003\u0002\u0002\u0002\u0016o\u0003",
    "\u0002\u0002\u0002\u0018\u001b\u0005\u0004\u0003\u0002\u0019\u001b\u0005",
    "\u0012\n\u0002\u001a\u0018\u0003\u0002\u0002\u0002\u001a\u0019\u0003",
    "\u0002\u0002\u0002\u001b\u001c\u0003\u0002\u0002\u0002\u001c\u001d\u0007",
    "\u0002\u0002\u0003\u001d\u0003\u0003\u0002\u0002\u0002\u001e \u0005",
    "\u0006\u0004\u0002\u001f\u001e\u0003\u0002\u0002\u0002\u001f \u0003",
    "\u0002\u0002\u0002 \"\u0003\u0002\u0002\u0002!#\u0005\n\u0006\u0002",
    "\"!\u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#$\u0003\u0002",
    "\u0002\u0002$(\u0005\b\u0005\u0002%\'\u0005\b\u0005\u0002&%\u0003\u0002",
    "\u0002\u0002\'*\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002()",
    "\u0003\u0002\u0002\u0002)\u0005\u0003\u0002\u0002\u0002*(\u0003\u0002",
    "\u0002\u0002+,\u0007\u0005\u0002\u0002,-\u0007\u0005\u0002\u0002-\u0007",
    "\u0003\u0002\u0002\u0002./\t\u0002\u0002\u0002/2\u0005\f\u0007\u0002",
    "01\u0007\u000f\u0002\u000213\u0005\u000e\b\u000220\u0003\u0002\u0002",
    "\u000223\u0003\u0002\u0002\u00023\t\u0003\u0002\u0002\u000245\u0007",
    "\t\u0002\u000256\u0007\n\u0002\u000267\u0005\u000e\b\u000278\u0007\u000b",
    "\u0002\u00028\u000b\u0003\u0002\u0002\u00029:\u0007\u0007\u0002\u0002",
    ":;\u0007\u0011\u0002\u0002;F\u0007\b\u0002\u0002<F\u0005\n\u0006\u0002",
    "=?\u0007\r\u0002\u0002>=\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002",
    "\u0002?@\u0003\u0002\u0002\u0002@F\u0007\u0012\u0002\u0002AC\u0007\r",
    "\u0002\u0002BA\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CD\u0003",
    "\u0002\u0002\u0002DF\u0007\u0011\u0002\u0002E9\u0003\u0002\u0002\u0002",
    "E<\u0003\u0002\u0002\u0002E>\u0003\u0002\u0002\u0002EB\u0003\u0002\u0002",
    "\u0002F\r\u0003\u0002\u0002\u0002GQ\u0007\u0012\u0002\u0002HM\u0007",
    "\u0012\u0002\u0002IJ\u0007\u0006\u0002\u0002JL\u0007\u0012\u0002\u0002",
    "KI\u0003\u0002\u0002\u0002LO\u0003\u0002\u0002\u0002MK\u0003\u0002\u0002",
    "\u0002MN\u0003\u0002\u0002\u0002NQ\u0003\u0002\u0002\u0002OM\u0003\u0002",
    "\u0002\u0002PG\u0003\u0002\u0002\u0002PH\u0003\u0002\u0002\u0002Q\u000f",
    "\u0003\u0002\u0002\u0002RS\u0007\u0007\u0002\u0002ST\u0005\u000e\b\u0002",
    "TU\u0007\b\u0002\u0002U\u0011\u0003\u0002\u0002\u0002VX\u0005\u0006",
    "\u0004\u0002WV\u0003\u0002\u0002\u0002WX\u0003\u0002\u0002\u0002XZ\u0003",
    "\u0002\u0002\u0002Y[\u0007\u0010\u0002\u0002ZY\u0003\u0002\u0002\u0002",
    "Z[\u0003\u0002\u0002\u0002[]\u0003\u0002\u0002\u0002\\^\u0005\n\u0006",
    "\u0002]\\\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^_\u0003",
    "\u0002\u0002\u0002_c\u0005\b\u0005\u0002`b\u0005\b\u0005\u0002a`\u0003",
    "\u0002\u0002\u0002be\u0003\u0002\u0002\u0002ca\u0003\u0002\u0002\u0002",
    "cd\u0003\u0002\u0002\u0002df\u0003\u0002\u0002\u0002ec\u0003\u0002\u0002",
    "\u0002fh\u0007\u0003\u0002\u0002gi\u0005\u0014\u000b\u0002hg\u0003\u0002",
    "\u0002\u0002hi\u0003\u0002\u0002\u0002i\u0013\u0003\u0002\u0002\u0002",
    "jk\u0007\r\u0002\u0002kl\u0005\u0016\f\u0002lm\u0007\u000e\u0002\u0002",
    "mn\u0005\u0016\f\u0002n\u0015\u0003\u0002\u0002\u0002op\t\u0003\u0002",
    "\u0002p\u0017\u0003\u0002\u0002\u0002\u0011\u001a\u001f\"(2>BEMPWZ]",
    "ch"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'?'", "'.'", "'!'", "','", "'['", "']'", "'$'", 
                     "'{'", "'}'", "'^'", "'#'", "'/'", "'->'", "'%'" ];

var symbolicNames = [ null, "QUESTION", "DOT", "BANG", "COMMA", "LBRACKET", 
                      "RBRACKET", "SELECTOR", "LBRACE", "RBRACE", "RETURN", 
                      "UTILITY", "DIVIDOR", "ARROW", "PAIR", "NUMBER", "STRING" ];

var ruleNames =  [ "eL_Program", "eL_Declaration", "negation", "dotBangPair", 
                   "selector", "selection", "stringList", "option", "eL_Query", 
                   "utility", "stringOrNum" ];

function ELParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ELParser.prototype = Object.create(antlr4.Parser.prototype);
ELParser.prototype.constructor = ELParser;

Object.defineProperty(ELParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ELParser.EOF = antlr4.Token.EOF;
ELParser.QUESTION = 1;
ELParser.DOT = 2;
ELParser.BANG = 3;
ELParser.COMMA = 4;
ELParser.LBRACKET = 5;
ELParser.RBRACKET = 6;
ELParser.SELECTOR = 7;
ELParser.LBRACE = 8;
ELParser.RBRACE = 9;
ELParser.RETURN = 10;
ELParser.UTILITY = 11;
ELParser.DIVIDOR = 12;
ELParser.ARROW = 13;
ELParser.PAIR = 14;
ELParser.NUMBER = 15;
ELParser.STRING = 16;

ELParser.RULE_eL_Program = 0;
ELParser.RULE_eL_Declaration = 1;
ELParser.RULE_negation = 2;
ELParser.RULE_dotBangPair = 3;
ELParser.RULE_selector = 4;
ELParser.RULE_selection = 5;
ELParser.RULE_stringList = 6;
ELParser.RULE_option = 7;
ELParser.RULE_eL_Query = 8;
ELParser.RULE_utility = 9;
ELParser.RULE_stringOrNum = 10;

function EL_ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_eL_Program;
    return this;
}

EL_ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EL_ProgramContext.prototype.constructor = EL_ProgramContext;

EL_ProgramContext.prototype.EOF = function() {
    return this.getToken(ELParser.EOF, 0);
};

EL_ProgramContext.prototype.eL_Declaration = function() {
    return this.getTypedRuleContext(EL_DeclarationContext,0);
};

EL_ProgramContext.prototype.eL_Query = function() {
    return this.getTypedRuleContext(EL_QueryContext,0);
};

EL_ProgramContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterEL_Program(this);
	}
};

EL_ProgramContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitEL_Program(this);
	}
};




ELParser.EL_ProgramContext = EL_ProgramContext;

ELParser.prototype.eL_Program = function() {

    var localctx = new EL_ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, ELParser.RULE_eL_Program);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        switch(la_) {
        case 1:
            this.state = 22;
            this.eL_Declaration();
            break;

        case 2:
            this.state = 23;
            this.eL_Query();
            break;

        }
        this.state = 26;
        this.match(ELParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EL_DeclarationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_eL_Declaration;
    return this;
}

EL_DeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EL_DeclarationContext.prototype.constructor = EL_DeclarationContext;

EL_DeclarationContext.prototype.dotBangPair = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DotBangPairContext);
    } else {
        return this.getTypedRuleContext(DotBangPairContext,i);
    }
};

EL_DeclarationContext.prototype.negation = function() {
    return this.getTypedRuleContext(NegationContext,0);
};

EL_DeclarationContext.prototype.selector = function() {
    return this.getTypedRuleContext(SelectorContext,0);
};

EL_DeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterEL_Declaration(this);
	}
};

EL_DeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitEL_Declaration(this);
	}
};




ELParser.EL_DeclarationContext = EL_DeclarationContext;

ELParser.prototype.eL_Declaration = function() {

    var localctx = new EL_DeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ELParser.RULE_eL_Declaration);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 29;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        if(la_===1) {
            this.state = 28;
            this.negation();

        }
        this.state = 32;
        _la = this._input.LA(1);
        if(_la===ELParser.SELECTOR) {
            this.state = 31;
            this.selector();
        }

        this.state = 34;
        this.dotBangPair();
        this.state = 38;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===ELParser.DOT || _la===ELParser.BANG) {
            this.state = 35;
            this.dotBangPair();
            this.state = 40;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function NegationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_negation;
    return this;
}

NegationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NegationContext.prototype.constructor = NegationContext;

NegationContext.prototype.BANG = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ELParser.BANG);
    } else {
        return this.getToken(ELParser.BANG, i);
    }
};


NegationContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterNegation(this);
	}
};

NegationContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitNegation(this);
	}
};




ELParser.NegationContext = NegationContext;

ELParser.prototype.negation = function() {

    var localctx = new NegationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, ELParser.RULE_negation);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 41;
        this.match(ELParser.BANG);
        this.state = 42;
        this.match(ELParser.BANG);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DotBangPairContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_dotBangPair;
    return this;
}

DotBangPairContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DotBangPairContext.prototype.constructor = DotBangPairContext;

DotBangPairContext.prototype.selection = function() {
    return this.getTypedRuleContext(SelectionContext,0);
};

DotBangPairContext.prototype.DOT = function() {
    return this.getToken(ELParser.DOT, 0);
};

DotBangPairContext.prototype.BANG = function() {
    return this.getToken(ELParser.BANG, 0);
};

DotBangPairContext.prototype.ARROW = function() {
    return this.getToken(ELParser.ARROW, 0);
};

DotBangPairContext.prototype.stringList = function() {
    return this.getTypedRuleContext(StringListContext,0);
};

DotBangPairContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterDotBangPair(this);
	}
};

DotBangPairContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitDotBangPair(this);
	}
};




ELParser.DotBangPairContext = DotBangPairContext;

ELParser.prototype.dotBangPair = function() {

    var localctx = new DotBangPairContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, ELParser.RULE_dotBangPair);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44;
        _la = this._input.LA(1);
        if(!(_la===ELParser.DOT || _la===ELParser.BANG)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
        this.state = 45;
        this.selection();
        this.state = 48;
        _la = this._input.LA(1);
        if(_la===ELParser.ARROW) {
            this.state = 46;
            this.match(ELParser.ARROW);
            this.state = 47;
            this.stringList();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SelectorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_selector;
    return this;
}

SelectorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SelectorContext.prototype.constructor = SelectorContext;

SelectorContext.prototype.SELECTOR = function() {
    return this.getToken(ELParser.SELECTOR, 0);
};

SelectorContext.prototype.LBRACE = function() {
    return this.getToken(ELParser.LBRACE, 0);
};

SelectorContext.prototype.stringList = function() {
    return this.getTypedRuleContext(StringListContext,0);
};

SelectorContext.prototype.RBRACE = function() {
    return this.getToken(ELParser.RBRACE, 0);
};

SelectorContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterSelector(this);
	}
};

SelectorContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitSelector(this);
	}
};




ELParser.SelectorContext = SelectorContext;

ELParser.prototype.selector = function() {

    var localctx = new SelectorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, ELParser.RULE_selector);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 50;
        this.match(ELParser.SELECTOR);
        this.state = 51;
        this.match(ELParser.LBRACE);
        this.state = 52;
        this.stringList();
        this.state = 53;
        this.match(ELParser.RBRACE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SelectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_selection;
    return this;
}

SelectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SelectionContext.prototype.constructor = SelectionContext;

SelectionContext.prototype.LBRACKET = function() {
    return this.getToken(ELParser.LBRACKET, 0);
};

SelectionContext.prototype.NUMBER = function() {
    return this.getToken(ELParser.NUMBER, 0);
};

SelectionContext.prototype.RBRACKET = function() {
    return this.getToken(ELParser.RBRACKET, 0);
};

SelectionContext.prototype.selector = function() {
    return this.getTypedRuleContext(SelectorContext,0);
};

SelectionContext.prototype.STRING = function() {
    return this.getToken(ELParser.STRING, 0);
};

SelectionContext.prototype.UTILITY = function() {
    return this.getToken(ELParser.UTILITY, 0);
};

SelectionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterSelection(this);
	}
};

SelectionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitSelection(this);
	}
};




ELParser.SelectionContext = SelectionContext;

ELParser.prototype.selection = function() {

    var localctx = new SelectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, ELParser.RULE_selection);
    var _la = 0; // Token type
    try {
        this.state = 67;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 55;
            this.match(ELParser.LBRACKET);
            this.state = 56;
            this.match(ELParser.NUMBER);
            this.state = 57;
            this.match(ELParser.RBRACKET);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 58;
            this.selector();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 60;
            _la = this._input.LA(1);
            if(_la===ELParser.UTILITY) {
                this.state = 59;
                this.match(ELParser.UTILITY);
            }

            this.state = 62;
            this.match(ELParser.STRING);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 64;
            _la = this._input.LA(1);
            if(_la===ELParser.UTILITY) {
                this.state = 63;
                this.match(ELParser.UTILITY);
            }

            this.state = 66;
            this.match(ELParser.NUMBER);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StringListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_stringList;
    return this;
}

StringListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringListContext.prototype.constructor = StringListContext;

StringListContext.prototype.STRING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ELParser.STRING);
    } else {
        return this.getToken(ELParser.STRING, i);
    }
};


StringListContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ELParser.COMMA);
    } else {
        return this.getToken(ELParser.COMMA, i);
    }
};


StringListContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterStringList(this);
	}
};

StringListContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitStringList(this);
	}
};




ELParser.StringListContext = StringListContext;

ELParser.prototype.stringList = function() {

    var localctx = new StringListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, ELParser.RULE_stringList);
    var _la = 0; // Token type
    try {
        this.state = 78;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 69;
            this.match(ELParser.STRING);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 70;
            this.match(ELParser.STRING);
            this.state = 75;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===ELParser.COMMA) {
                this.state = 71;
                this.match(ELParser.COMMA);
                this.state = 72;
                this.match(ELParser.STRING);
                this.state = 77;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OptionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_option;
    return this;
}

OptionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OptionContext.prototype.constructor = OptionContext;

OptionContext.prototype.LBRACKET = function() {
    return this.getToken(ELParser.LBRACKET, 0);
};

OptionContext.prototype.stringList = function() {
    return this.getTypedRuleContext(StringListContext,0);
};

OptionContext.prototype.RBRACKET = function() {
    return this.getToken(ELParser.RBRACKET, 0);
};

OptionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterOption(this);
	}
};

OptionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitOption(this);
	}
};




ELParser.OptionContext = OptionContext;

ELParser.prototype.option = function() {

    var localctx = new OptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, ELParser.RULE_option);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 80;
        this.match(ELParser.LBRACKET);
        this.state = 81;
        this.stringList();
        this.state = 82;
        this.match(ELParser.RBRACKET);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EL_QueryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_eL_Query;
    return this;
}

EL_QueryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EL_QueryContext.prototype.constructor = EL_QueryContext;

EL_QueryContext.prototype.dotBangPair = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DotBangPairContext);
    } else {
        return this.getTypedRuleContext(DotBangPairContext,i);
    }
};

EL_QueryContext.prototype.QUESTION = function() {
    return this.getToken(ELParser.QUESTION, 0);
};

EL_QueryContext.prototype.negation = function() {
    return this.getTypedRuleContext(NegationContext,0);
};

EL_QueryContext.prototype.PAIR = function() {
    return this.getToken(ELParser.PAIR, 0);
};

EL_QueryContext.prototype.selector = function() {
    return this.getTypedRuleContext(SelectorContext,0);
};

EL_QueryContext.prototype.utility = function() {
    return this.getTypedRuleContext(UtilityContext,0);
};

EL_QueryContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterEL_Query(this);
	}
};

EL_QueryContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitEL_Query(this);
	}
};




ELParser.EL_QueryContext = EL_QueryContext;

ELParser.prototype.eL_Query = function() {

    var localctx = new EL_QueryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, ELParser.RULE_eL_Query);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        if(la_===1) {
            this.state = 84;
            this.negation();

        }
        this.state = 88;
        _la = this._input.LA(1);
        if(_la===ELParser.PAIR) {
            this.state = 87;
            this.match(ELParser.PAIR);
        }

        this.state = 91;
        _la = this._input.LA(1);
        if(_la===ELParser.SELECTOR) {
            this.state = 90;
            this.selector();
        }

        this.state = 93;
        this.dotBangPair();
        this.state = 97;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===ELParser.DOT || _la===ELParser.BANG) {
            this.state = 94;
            this.dotBangPair();
            this.state = 99;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 100;
        this.match(ELParser.QUESTION);
        this.state = 102;
        _la = this._input.LA(1);
        if(_la===ELParser.UTILITY) {
            this.state = 101;
            this.utility();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function UtilityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_utility;
    return this;
}

UtilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UtilityContext.prototype.constructor = UtilityContext;

UtilityContext.prototype.UTILITY = function() {
    return this.getToken(ELParser.UTILITY, 0);
};

UtilityContext.prototype.stringOrNum = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StringOrNumContext);
    } else {
        return this.getTypedRuleContext(StringOrNumContext,i);
    }
};

UtilityContext.prototype.DIVIDOR = function() {
    return this.getToken(ELParser.DIVIDOR, 0);
};

UtilityContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterUtility(this);
	}
};

UtilityContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitUtility(this);
	}
};




ELParser.UtilityContext = UtilityContext;

ELParser.prototype.utility = function() {

    var localctx = new UtilityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, ELParser.RULE_utility);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 104;
        this.match(ELParser.UTILITY);
        this.state = 105;
        this.stringOrNum();
        this.state = 106;
        this.match(ELParser.DIVIDOR);
        this.state = 107;
        this.stringOrNum();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StringOrNumContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ELParser.RULE_stringOrNum;
    return this;
}

StringOrNumContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringOrNumContext.prototype.constructor = StringOrNumContext;

StringOrNumContext.prototype.STRING = function() {
    return this.getToken(ELParser.STRING, 0);
};

StringOrNumContext.prototype.NUMBER = function() {
    return this.getToken(ELParser.NUMBER, 0);
};

StringOrNumContext.prototype.enterRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.enterStringOrNum(this);
	}
};

StringOrNumContext.prototype.exitRule = function(listener) {
    if(listener instanceof ELListener ) {
        listener.exitStringOrNum(this);
	}
};




ELParser.StringOrNumContext = StringOrNumContext;

ELParser.prototype.stringOrNum = function() {

    var localctx = new StringOrNumContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, ELParser.RULE_stringOrNum);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 109;
        _la = this._input.LA(1);
        if(!(_la===ELParser.NUMBER || _la===ELParser.STRING)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.ELParser = ELParser;
