grammar ELTokens;

QUESTION : '?';
DOT : '.';
BANG : '!';
COMMA : ',';
LBRACKET : '[';
RBRACKET : ']';

SELECTOR : '$';
LBRACE : '{';
RBRACE : '}';

RETURN : '^';
UTILITY : '#';
DIVIDOR : '/';
ARROW : '->';

PAIR : '%';

//no whitespace, no internal .'s
NUMBER : '-'?[0-9]+;
STRING : [a-zA-Z_0-9]+;

