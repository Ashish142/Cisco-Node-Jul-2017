var accumulator = require('./accumulator')();
accumulator.add(100);
accumulator.subtract(50);
accumulator.multiply(5);
accumulator.divide(2);

console.log(accumulator.getResult()); //-> 125

var accumulator2 = require('./accumulator')();
console.log(accumulator2.getResult()); //-> 0