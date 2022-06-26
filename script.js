const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let activityLog = ''; //each user-click should append something here



//check log after every button press, (at updateLog(), or 
//a new eventListener

//for log reading: each symbol should be categorized:
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

function checkLog() {
    //log should be checked from latest to earliest input
    for (let i = activityLog.length; i >= 0; ++i) {
        //if the last operator was '='
        //check if the a number was before
        //once a non-number input is found, check if it's an operator
        //if so, check again to grab a number
    }
}

//    if it's in the following format:
//    or maybe if '=' was pressed
//    `<number>` , `<operation>`, `<number>`, `<equals(=)>`
//    pass these variables to operate()
//    update display with the result.

for (button of buttons) {
    button.addEventListener('click', updateLog);
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