# Exclusion Logic

Based on [Richard Evans Language](https://versublog.files.wordpress.com/2014/05/praxis.pdf)

# Basic Usage:
For Node.js use [amdefine](https://github.com/jrburke/amdefine) then:
```
    //Require the library:
    let EFB = require('./ExclusionFactBase');
    //Create a world of facts:
    let world = new EFB();
```
Require.js:
``` 
    require(['ExclusionFactBase'],function(EFB){
        let world = new EFB();
    })
```


## Assertion and Retraction
```
    //Normal non-exclusion
    world.assert(".characters.bob",".characters.bill",".characters.jill");
    //exclusionary concepts:
    world.assert(".characters.bob.location!kitchen");
```
And Retract statements:
```
    world.retract(".characters.bill");
    //leaves .characters.bob and .jill intact
```

## Tests

Simple Existence:
```
    if(world.exists(".characters.bob")){
        console.log("Bob says hello");
    }
```
Negation by leading double bang:
```
    if(world.exists("!!.characters.bill")){
        console.log("Bill does not exist");
    }
``` 

### Binding


Selection of options with %n{x}:
(For n as the number of options to choose, x the name to bind to.
If no n is specified, gets all the values possible
)
```
    let result = world.exists(".characters.%1{x}");
    //result.x === bill || bob
    
    //bind multiple values
    result = world.exists(".characters.%{x}")
    //result.x === [bob,jill]
```

Sequential Sub-binding:
```
    world.assert(".characters.bob.items.knife",".characters.jill.items.fork");
    result = world.exists(".characters.%1{x}.items.%1{y}");
    //result === {x : bob, y : knife } || {x : jill, y : fork }
```

### Utility tests:
Currently returns values as strings, so use Number() if necessary afterwards
```
    result = world.exists(".characters.bob^2/4"),
    //bob exists so result === 2
    result = world.exists(".characters.bill^2/4");
    //bill does not exist so result === 4
```

## Unit Testing
Unit tests are written for [NodeUnit](https://github.com/caolan/nodeunit)
