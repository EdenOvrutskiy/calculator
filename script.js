const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

//TODO: 
//reduce code duplication 
//no floating-point numbers?
//enable a chain of computation
//something other than 'start' -> like some error message..
//move from "states"/ "state machine" to some code
//that better describes itself?


//////////////

//for input parsing: each symbol should be categorized:
//number, operation, or equals
const symbolMap = {};
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let digit of digits) {
    symbolMap[digit] = 'digit';
}
const operators = ['+', '-', '*', '/'];
for (let operator of operators) {
    symbolMap[operator] = 'operator';
}
symbolMap['='] = 'equals';

let firstNumber = '';//a string: appending digits acts like 
//contcatenation, not addition.
let secondNumber = '';
let operator = '';


//the calculator's state determines what it currently 
//'remembers',and how it will respond to incoming input.
//see calc_state_machine.png for a visual representation
const states = ['start', 'number', 'number-operation',
    'number-operation-number'];

let state = 'start';
function processInput(pointerEvent) {
    const input = pointerEvent.currentTarget.textContent;
    if (state == 'start') {
        if (isDigit(input)) { //
            //append to a number
            firstNumber = firstNumber + input.toString(); //appending 
            //digits works like contacetantion, not addition
            state = 'number';
            display.textContent = firstNumber;
        }
        else {
            resetCalculator();
        }
    }
    else if (state == 'number') {
        if (isDigit(input)) { //
            firstNumber = firstNumber + input.toString();
            state = 'number';
            display.textContent = firstNumber;
        }
        else if (isOperator(input)) {
            operator = input;
            state = 'number-operation';
            display.textContent = firstNumber + operator;
        }
        else {
            resetCalculator();
        }
    }
    else if (state == 'number-operation') {
        if (isDigit(input)) { //
            secondNumber = secondNumber + input.toString();
            state = 'number-operation-number';
            display.textContent = firstNumber + operator
                + secondNumber;
        }
        else {
            resetCalculator();
        }
    }
    else if (state == 'number-operation-number') {
        if (isDigit(input)) { //
            secondNumber = secondNumber + input.toString();
            state = 'number-operation-number';
            display.textContent = firstNumber + operator
                + secondNumber;
        }
        else if (input == '=') {
            //compute and display
            let result = operate(operator, firstNumber, secondNumber);
            resetCalculator();
            display.textContent = result;
        }
        else {
            resetCalculator();
        }
    }

}
function resetCalculator() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    state = 'start';
    display.textContent = 'start';
}



function isOperator(input) { //attach this to a button
    return (symbolMap[input] == 'operator');
}

function isDigit(input) { //attach this to a button
    return (symbolMap[input] == 'digit');
}


for (button of buttons) {
    button.addEventListener('click', processInput);
}

function updateLog(pointerEvent) {
    //pointerEvent is passed byt addEventListener 
    button = pointerEvent.target;//extract button DOM from click event
    activityLog += button.textContent; //append it's content to a log
}

function add(addend, addend2) {
    return (parseInt(addend) + parseInt(addend2));
}

const subtract = function (minued, subtrahend) {
    return (minued - subtrahend);
};

const multiply = function (factor, factor2) {
    return factor * factor2;
};

const divide = function (dividend, divisor) {
    if (divisor != 0) {
        return dividend / divisor;
    }
    else {
        return "ERROR - cannot divide by 0";
    }
};

function operate(operator, number, secondNumber) {
    if (operator == "+") {
        return add(number, secondNumber);
    }
    else if (operator == "-") {
        return subtract(number, secondNumber);
    }
    else if (operator == "*") {
        return multiply(number, secondNumber);
    }
    else if (operator == "/") {
        return divide(number, secondNumber);
    }
    else {
        return "ERROR - bad operator for operate function";
    }
}