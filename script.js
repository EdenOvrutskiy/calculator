const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

//TODO: how is the "start" state different than the 
//'number' state? should I remove it?

//trying to implement a state machine (calc_state_machine.png)
//let's begin with accepting an input of a digit, and rejecting
//all other inputs


//start by listening to input (addEventListener to button)

//for input parsing: each symbol should be categorized:
//number, operation, or equals
const symbolMap = {};
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (digit of digits) {
    symbolMap[digit] = 'digit';
}
const operators = ['+', '-', '*', '/'];
for (operator of operators) {
    symbolMap[operator] = 'operator';
}
symbolMap['='] = 'equals';

let number1 = '';//appending digits acts like contcatenation,
//not addition.
let number2 = '';
let operatorInput = '';


let states = ['start', 'number', 'number-operation',
    'number-operation-number'];

let state = 'start';
function processInput(pointerEvent) {
    const input = pointerEvent.currentTarget.textContent;
    if (state == 'start' || state == 'number') {
        if (isDigit(input)) { //
            //append to a number
            number1 = number1 + input.toString(); //appending digits works like
            //                          //contacetantion, not addition
            state = 'number';
        }
        else if (isOperator(input)) {
            state = 'number-operation';
            operatorInput = input;
        }
    }
}

function isOperator(input) { //attach this to a button
    return (symbolMap[input] == 'operator');
}

function isDigit(input) { //attach this to a button
    return (symbolMap[input] == 'digit');
}


for (button of buttons) {
    button.addEventListener('click', processInput);
    button.addEventListener('click', populateDisplay);
}

function updateLog(pointerEvent) {
    //pointerEvent is passed byt addEventListener 
    button = pointerEvent.target;//extract button DOM from click event
    activityLog += button.textContent; //append it's content to a log
}

function populateDisplay(pointerEvent) {
    //extract button's element from addEventListener
    const button = pointerEvent.target;
    //grab button's text
    const buttonText = button.textContent;
    //overwerite the display with the button's value
    display.textContent = buttonText;
}


function add(addend, addend2) {
    return (addend + addend2);
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

function operate(operator, number, number2) {
    if (operator == "+") {
        return add(number, number2);
    }
    else if (operator == "-") {
        return subtract(number, number2);
    }
    else if (operator == "*") {
        return multiply(number, number2);
    }
    else if (operator == "/") {
        return divide(number, number2);
    }
    else {
        return "ERROR - bad operator for operate function";
    }
}