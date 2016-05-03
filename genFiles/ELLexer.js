// Generated from grammar/EL.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('../ANTLR.min');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002\u0012M\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003",
    "\n\u0003\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0005",
    "\u0010B\n\u0010\u0003\u0010\u0006\u0010E\n\u0010\r\u0010\u000e\u0010",
    "F\u0003\u0011\u0006\u0011J\n\u0011\r\u0011\u000e\u0011K\u0002\u0002",
    "\u0012\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f",
    "\t\u0011\n\u0013\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d",
    "\u0010\u001f\u0011!\u0012\u0003\u0002\u0004\u0003\u00022;\u0006\u0002",
    "2;C\\aac|O\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002",
    "\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002",
    "\u0002\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002",
    "\u0002\u0002\u0002\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002",
    "\u0002\u0002\u0002\u0013\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002",
    "\u0002\u0002\u0002\u0017\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002",
    "\u0002\u0002\u0002\u001b\u0003\u0002\u0002\u0002\u0002\u001d\u0003\u0002",
    "\u0002\u0002\u0002\u001f\u0003\u0002\u0002\u0002\u0002!\u0003\u0002",
    "\u0002\u0002\u0003#\u0003\u0002\u0002\u0002\u0005%\u0003\u0002\u0002",
    "\u0002\u0007\'\u0003\u0002\u0002\u0002\t)\u0003\u0002\u0002\u0002\u000b",
    "+\u0003\u0002\u0002\u0002\r-\u0003\u0002\u0002\u0002\u000f/\u0003\u0002",
    "\u0002\u0002\u00111\u0003\u0002\u0002\u0002\u00133\u0003\u0002\u0002",
    "\u0002\u00155\u0003\u0002\u0002\u0002\u00177\u0003\u0002\u0002\u0002",
    "\u00199\u0003\u0002\u0002\u0002\u001b;\u0003\u0002\u0002\u0002\u001d",
    ">\u0003\u0002\u0002\u0002\u001fA\u0003\u0002\u0002\u0002!I\u0003\u0002",
    "\u0002\u0002#$\u0007A\u0002\u0002$\u0004\u0003\u0002\u0002\u0002%&\u0007",
    "0\u0002\u0002&\u0006\u0003\u0002\u0002\u0002\'(\u0007#\u0002\u0002(",
    "\b\u0003\u0002\u0002\u0002)*\u0007.\u0002\u0002*\n\u0003\u0002\u0002",
    "\u0002+,\u0007]\u0002\u0002,\f\u0003\u0002\u0002\u0002-.\u0007_\u0002",
    "\u0002.\u000e\u0003\u0002\u0002\u0002/0\u0007&\u0002\u00020\u0010\u0003",
    "\u0002\u0002\u000212\u0007}\u0002\u00022\u0012\u0003\u0002\u0002\u0002",
    "34\u0007\u007f\u0002\u00024\u0014\u0003\u0002\u0002\u000256\u0007`\u0002",
    "\u00026\u0016\u0003\u0002\u0002\u000278\u0007%\u0002\u00028\u0018\u0003",
    "\u0002\u0002\u00029:\u00071\u0002\u0002:\u001a\u0003\u0002\u0002\u0002",
    ";<\u0007/\u0002\u0002<=\u0007@\u0002\u0002=\u001c\u0003\u0002\u0002",
    "\u0002>?\u0007\'\u0002\u0002?\u001e\u0003\u0002\u0002\u0002@B\u0007",
    "/\u0002\u0002A@\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002BD",
    "\u0003\u0002\u0002\u0002CE\t\u0002\u0002\u0002DC\u0003\u0002\u0002\u0002",
    "EF\u0003\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002FG\u0003\u0002\u0002",
    "\u0002G \u0003\u0002\u0002\u0002HJ\t\u0003\u0002\u0002IH\u0003\u0002",
    "\u0002\u0002JK\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002KL\u0003",
    "\u0002\u0002\u0002L\"\u0003\u0002\u0002\u0002\u0006\u0002AFK\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function ELLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

ELLexer.prototype = Object.create(antlr4.Lexer.prototype);
ELLexer.prototype.constructor = ELLexer;

ELLexer.EOF = antlr4.Token.EOF;
ELLexer.QUESTION = 1;
ELLexer.DOT = 2;
ELLexer.BANG = 3;
ELLexer.COMMA = 4;
ELLexer.LBRACKET = 5;
ELLexer.RBRACKET = 6;
ELLexer.SELECTOR = 7;
ELLexer.LBRACE = 8;
ELLexer.RBRACE = 9;
ELLexer.RETURN = 10;
ELLexer.UTILITY = 11;
ELLexer.DIVIDOR = 12;
ELLexer.ARROW = 13;
ELLexer.PAIR = 14;
ELLexer.NUMBER = 15;
ELLexer.STRING = 16;


ELLexer.modeNames = [ "DEFAULT_MODE" ];

ELLexer.literalNames = [ null, "'?'", "'.'", "'!'", "','", "'['", "']'", 
                         "'$'", "'{'", "'}'", "'^'", "'#'", "'/'", "'->'", 
                         "'%'" ];

ELLexer.symbolicNames = [ null, "QUESTION", "DOT", "BANG", "COMMA", "LBRACKET", 
                          "RBRACKET", "SELECTOR", "LBRACE", "RBRACE", "RETURN", 
                          "UTILITY", "DIVIDOR", "ARROW", "PAIR", "NUMBER", 
                          "STRING" ];

ELLexer.ruleNames = [ "QUESTION", "DOT", "BANG", "COMMA", "LBRACKET", "RBRACKET", 
                      "SELECTOR", "LBRACE", "RBRACE", "RETURN", "UTILITY", 
                      "DIVIDOR", "ARROW", "PAIR", "NUMBER", "STRING" ];

ELLexer.grammarFileName = "EL.g4";



exports.ELLexer = ELLexer;

