({
    //http://www.sitepoint.com/building-library-with-requirejs/
    baseUrl: "./lib/antlr4_runtime",
    paths : {
        requireLib : "../../../../node_modules/requirejs/require",
        //require : "../require",
        lodash : "../../../../node_modules/lodash/lodash.min",
    },
    exclude : ['lodash'],
    //keepAmdefine : true,
    include : ['../../../../node_modules/almond/almond'],
    cjsTranslate : true,
    name : "index",
    //insertRequire : [ "ReteClassInterface"],
    out: "./ANTLR.min.js",
    //optimize: "none",
    wrap : {
        startFile : "startWrap.js",
        end : "define('lodash',function() { return _; }); return require('index'); }));"
    },
});
