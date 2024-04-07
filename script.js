//Firstly, we define a two prompts to ask the user a value and we wrap it with Numbers() to convert the value type into number;
const num = +prompt("Calculator: (First Number): ");
const num2 = +prompt("Calculator: (Second Number): ");

//We define a object called answer where we put all of the total;
const answers = {};

//We define 4 functions named add, subtract, multiply and divide and we define it to get the total of each math operator and we are assigning the total number into the answers object.
function add(firstVal, secondVal) {
  const add = firstVal + secondVal;

  return Object.assign(answers, { add });
}
function subtract(firstVal, secondVal) {
  const subtract = firstVal - secondVal;

  return Object.assign(answers, { subtract });
}
function multiply(firstVal, secondVal) {
  const multiply = firstVal * secondVal;

  return Object.assign(answers, { multiply });
}
function divide(firstVal, secondVal) {
  const divide = firstVal / secondVal;

  return Object.assign(answers, { divide });
}
//We are calling the function to assign the functions to the answers object.
add(num, num2);
subtract(num, num2);
multiply(num, num2);
divide(num, num2);
//We define a object called calculator and we are referencing the object named answers to get the reference.
const calculator = answers;

//We check whether the value is contain any non-numbers value or real numbers;

if (!isFinite(num) || !isFinite(num2)) {
  console.log("Please, enter only a number");
} else {
  console.log("Output: ");
  console.log(`Addition: ${num} + ${num2} = ${num + num2}`);
  console.log(`Subtraction: ${num} - ${num2} = ${num - num2}`);
  console.log(`Addition: ${num} * ${num2} = ${num * num2}`);
  console.log(`Addition: ${num} / ${num2} = ${num / num2}`);
}
