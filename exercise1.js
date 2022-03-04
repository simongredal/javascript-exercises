// JavaScript functions and Callbacks
// 1) Create a new JavaScript file and add these three functions

// Function Declaration
// Observe: no return type, no type on parameters
function add(n1, n2){
     return n1 + n2;
}

// Function Expression
const sub = function(n1,n2){
    return n1 - n2
}

// Callback example
const cb = function(n1,n2, callback){
    return `Result from the two numbers: ${n1}+${n2}=${callback(n1,n2)}`;
}

// The following questions might seem trivial, but it's extremely important that you can answer (and understand) each, in order to do the JS-stuff we want to do this semester
// 2) Call the functions above as sketched below. It’s not about doing it as fast as you can, but about understanding what's happening, so make sure you understand each line.

console.log( add(1, 2) )         // What will this print?
console.log( add )                       // What will it print and what does add represent?
console.log( add(1, 2, 3) )      // What will it print
console.log( add(1) )                // What will it print
console.log( cb(3, 3, add) )     // What will it print
console.log( cb(4, 3, sub) )     // What will it print
//console.log( cb(3, 3, add()) )   // What will it print (and what was the problem)
console.log( cb(3, "hh", add) )  // What will it print

// 3)  Error Handling
// 7 will fail due to missing/wrong arguments. But it will fail at runtime, not as with Java, at compile time.
// We can check arguments in JavaScript as sketched below and provide better errors by throwing our own exceptions:
//
//      typeof n1 === "number" //Will fail if n1 is undefined, or is not a number
//      typeof callback === "function" //Will fail if callback is undefined or is not a function
//
// Rewrite the Callback function expression (cb)  to make a check for all its three required arguments, and throw an Error if any of the arguments do not match as explained here.
// Surround the call to the function with a try-catch block, and provide a more user-friendly error message if the function throws an error

const cb2 = function(n1, n2, callback) {
    if (typeof n1 !== "number") { throw new Error("parameter n1 is not a number")}
    if (typeof n2 !== "number") { throw new Error("parameter n2 is not a number")}
    if (typeof cb !== "function") { throw new Error("parameter callback is not a function")}

    return `Result from the two numbers: ${n1}+${n2}=${callback(n1,n2)}`;
}

// More Callbacks
// Take another look at the function expression declared in cb, and the provided callbacks in 5+6. What we have in cb is a very generic function that can take any callback that can do something with two numbers and return a value.

// 4) Write a mul(n1, n2) function (inspired by add and sub) and use it as the callback for the cb function

const mul = function(n1, n2) {
    return n1 * n2
}

console.log( cb2(5, 7, mul) )

// 5) Call cb, this time with an anonymous function that divides the first argument with the second
console.log( cb2(9, 3, (x, y) => { return x/y }) )









// Callbacks (with map, filter and forEach)
// We saw a simple example of a callback above. Let's get familiar with callbacks, using some of the array-type’s built-in methods.
// Getting comfortable with filter, map and forEach:


// 1) Declare a JavaScript array and initialize it with some names (Lars, Jan, Peter, Bo, Frederik etc.).
// Use the filter method to create a new array with only names of length <=3.
// Use the forEach method to iterate and print (console.log) both the original and the new array.

const names = ["Bo", "Ib", "Børge", "Karl", "Frederik", "Lars", "Jan", "Simon", "Ole", "Peter"]
names.filter( name => { return name.length <= 3} ).forEach( name => console.log(name) )


// 2) Use the names-array created above, and, using its map method, create a new array with all names uppercased.
// We will continue with this exercise tomorrow when we start manipulating the browser's DOM
const upper_names = names.map( (name) => {return name.toUpperCase()} )
console.log(upper_names)

// 3) Use map, join + just a little more to create a function, which given the array of names, for example: ["Lars", "Peter", "Jan", "Ian"] returns a string with the HTML for the names in an <ul> as sketched below:
// <ul>
//     <li>Lars</li>
//     <li>Peter</li>
//     <li>Jan</li>
//     <li>Ian</li>
// <ul>
// The output above was shown with newlines for readability, but this is actually what we want (why):
// <ul><li>Lars</li><li>Peter</li><li>Jan</li><li>Ian</li><ul>
// Eventually we will use DOM manipulation and place this into a “running” web-page.

const names_list_item = "<ul>"+names.map( name => `<li>${name}</li>`).join("")+"</ul>"
console.log(names_list_item)

// 4)  Given this JavaScript array
const cars = [
    { id: 1, year: 1997, make: 'Ford', model: 'E350', price: 3000 },
    { id: 2, year: 1999, make: 'Chevy', model: 'Venture', price: 4900 },
    { id: 3, year: 2000, make: 'Chevy', model: 'Venture', price: 5000 },
    { id: 4, year: 1996, make: 'Jeep', model: 'Grand Cherokee', price: 4799 },
    { id: 5, year: 2005, make: 'Volvo', model: 'V70', price: 44799 },
];

// Use the filter function to get arrays with only:
// a) Cars newer than 1999
console.log( cars.filter( car => car.year > 1999 ) )

// b) All  Volvo’s
console.log( cars.filter( car => car.make === "Volvo") )

// c) All cars with a price below 5000
console.log( cars.filter( car => car.price <= 5000) )


// d) (Extra, ONLY if you have time)
// Use map, join + just a little more to implement a function that, given the cars array used above, will create,
// and return a string with valid SQL statements to insert the data into a table with matching column
// names (id, year, make, model, price) as sketched below:
//     INSERT INTO cars (id,year,make,model,price) VALUES ( 1, 1997 'Ford','E350', 3000 );
//     ...


cars.map( car => `INSERT INTO cars (id, year, make, model, price) VALUES (${car.id}, ${car.year}, ${car.make}, ${car.model}, ${car.price});` )
    .forEach( statement => console.log(statement))







// Implement YOUR OWN functions that takes callbacks as arguments
// Assume the array did NOT offer the map and filter methods. Then you would have to implement them yourself.
// This is what you should do in the following to get practice with writing functions that take callbacks as arguments.
// The next two functions should work exactly as the arrays built in methods, except that you will need to pass the array to be used, into the functions.
// a) Implement a function: myFilter(array, callback) that takes an array as the first argument,
// and a callback as the second and returns a new (filtered) array according to the code provided in the callback
// Test the method with the same array and callback as in the example with the original filter method.
const animals = ["Tiger", "Elephant", "Horse", "Cat", "Dog", "Rabbit", "Lion", "Giraffe", "Squirrel", "Goose"]
function filter(array, predicate) {
    const result = []
    for (const item of array) {
        const should_include = predicate(item)
        if (should_include) { result.push(item) }
    }
    return result
}

function has_double_letters(word) {
    let previous_letter = ""
    for (const letter of word) {
        if (letter === previous_letter) {
            return true
        }
        previous_letter = letter
    }
    return false
}

console.log(filter(animals, has_double_letters));
console.log(animals.filter(has_double_letters));

// b) Implement a function: myMap(array, callback)that, provided an array and a callback, provides the same functionality as calling the existing map method on an array.
// Test the method with the same array and callback as in the example with the original map method.
function map(array, callback) {
    const result = []
    for (const item of array) {
        result.push( callback(item) )
    }
    return result
}
function alternate_casing(sentence) {
    let result = ""
    for (const letter in sentence) {
        const parity = letter % 3 === 1

        if (parity) { result += sentence[letter].toUpperCase() }
        else { result += sentence[letter].toLowerCase() }
    }
    return result
}
console.log(map(animals, alternate_casing));
console.log(animals.map(alternate_casing));









// Asynchronous Callbacks
// Most of the javascript callbacks you will be using will be asynchronous, in contrary to map, filter and forEach which are synchronous (MAKE SURE you understand the difference)
// 1) Given the code below answer, don’t execute the code, in what order you would expect to see the outputs:
//         const msgPrinter = function(msg, delay) {
//             setTimeout(() => console.log(msg), delay); // Observe an arrow-function
//         };
//         console.log("aaaaaaaaaa");
//         msgPrinter ("bbbbbbbbbb", 2000);
//         console.log("dddddddddd");
//         msgPrinter ("eeeeeeeeee", 1000);
//         console.log("ffffffffff");

// TODO: MY ANSWER a, d, f, e, b
// 2) Add the code to a javascript file, execute and verify whether you answer to 1) was right











// JavaScript Objects
// 1) Create an object with four different properties, with values of your own choice (ex: name, birthday, hobby, email).
// Use a for-in loop (as sketched below) to demonstrate that we can iterate over the properties in an object.
//     for(prop in myObj){
//         console.log(prop, myObj[prop]);
//     }
const my_object = {
    thing_a: "Hello",
    1: "it is",
    2: "wednesday",
    thing_b: "My",
    thing_c: "dudes"
}
for (let property in my_object) {
    console.log(property, my_object[property])
}

// Use the delete keyword to demonstrate we can delete existing properties from an object (delete a property, and iterate over the properties again)
// Add a new property to your object to demonstrate that we can add new properties to existing objects
const my_other_object = {
    thing_a: "Hello",
    1: "it is",
    2: "wednesday",
    thing_b: "My",
    thing_c: "dudes"
}
for (let property in my_other_object) {
    console.log(property, my_other_object[property])
}
delete my_other_object.thing_a
for (let property in my_other_object) {
    console.log(property, my_other_object[property])
}








// Closures in JavaScript
// 1) Implement and test the Closure Counter Example from the Slides
function counter_creator() {
    let counter = 0
    function change_by(x) { counter += x }
    return {
        increment: function() { change_by(+1) },
        decrement: function() { change_by(-1) },
        value: function() { return counter },
    }
}
counter_1 = counter_creator();
counter_2 = counter_creator();
counter_1.increment(); counter_1.increment(); counter_1.increment(); counter_1.decrement()
counter_2.increment(); counter_2.increment(); counter_2.decrement(); counter_2.decrement()
console.log(counter_1.value()); console.log(counter_2.value())


// 2) Implement a reusable function using the Module pattern that should encapsulate information about a person (name, and age) and return an object with the following methods:
//     setAge
//     setName
//     getInfo (should return a string like Peter, 45)

class Person {
    constructor(name, age) {
        this.m_name = name
        this.m_age = age
    }

    get name() { return this.m_name }
    get age() { return this.m_age }
    set name(name) { this.m_name = name }
    set age(age) { this.m_age = age }

    get_info() {
        return `${this.name}, ${this.age}`
    }
}

const person1 = new Person("Peter", 45)
person1.age = 49
console.log(person1.get_info());


