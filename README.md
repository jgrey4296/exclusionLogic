# Exclusion Logic

Based on [Richard Evans Language](https://versublog.files.wordpress.com/2014/05/praxis.pdf)

# Basic Usage:
```
    //Require the library:
    let EFB = require('./ExclusionFactBase');
    //Create a world of facts:
    let world = new EFB();
```

## Assertion and Retraction
```
    //Normal non-exclusion
    world.assert(".characters.bob",".characters.bill",".characters.jill");
    //Assert exclusionary concepts:
    world.assert(".characters.bob.location!kitchen");
```
    And Retract statements:
```
    //Retract some statements:
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
Negation:
```
    if(world.exists("!!.characters.bill")){
        console.log("Bill does not exist");
    }
``` 

### Binding

Selection of options:
```
    let result = world.exists(".characters.%1{x}");
    //result.x === bill || bob
    
    //bind multiple values
    result = world.exists(".characters.%{x}")
    //result.x === [bob,jill]
```

Sequential Subbinding:
```
    world.assert(".characters.bob.items.knife",".characters.jill.items.fork");
    result = world.exists(".characters.%1{x}.items.%1{y}");
    //result === {x : bob, y : knife } || {x : jill, y : fork }
```

### Utility tests:
```
    result = world.exists(".characters.bob^2/4"),
    //bob exists so result === 2
    result = world.exists(".characters.bill^2/4");
    //bill does not exist so result === 4
```
