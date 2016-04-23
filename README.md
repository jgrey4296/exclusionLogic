# Exclusion Logic

Based on [[Richard Evans Language][https://versublog.files.wordpress.com/2014/05/praxis.pdf]]

```
    //Require the library:
    let EFB = require('./ExclusionFactBase');
    //Create a world of facts:
    let world = new EFB();
    
    //Assert some statements:
    world.assert(".characters.bob",".characters.bill",".characters.jill");
    //Assert exclusionary concepts:
    world.assert(".characters.bob.location!kitchen");
    //Retract some statements:
    world.retract(".characters.bill");
    
    //Test for existence of a fact:
    if(world.exists(".characters.bob")){
        console.log("Bob says hello");
    }
    
    //And non-existence:
    if(world.exists("!!.characters.bill")){
        console.log("Bill does not exist");
    }
    
    //bind values:
    let result = world.exists(".characters.%1{x}");
    //result.x === bill || bob
    
    //bind subvalues (only for single bindings):
    world.assert(".characters.bob.items.knife",".characters.jill.items.fork");
    result = world.exists(".characters.%1{x}.items.%1{y}");

    //bind multiple values
    result = world.exists(".characters.%{x}")
    //result.x === [bob,jill]
    
    //Return values (binary still but useful for utility calculations):
    result = world.exists(".characters.bob^2/4"),
    //result === 2
    result = world.exists(".characters.bill^2/4");
    //result2 === 4

```
