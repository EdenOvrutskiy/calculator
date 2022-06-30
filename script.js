const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');


let firstNumber = '';//a string: appending digits acts like 
//contcatenation, not addition.
let secondNumber = '';
let operator = '';

//the calculator's state determines what it currently 
//'remembers',and how it will respond to incoming input.
//see calc_state_machine.png for a visual representation
const states = ['start', 'number', 'number-operation',
    'number-operation-number'];

function toggleWordOrNumberDisplay(mode) {
    if (mode == 'number') {
        display.style.wordWrap = 'break-word';
        display.style.wordBreak = 'break-all';
    }
    else if (mode == 'word') {
        display.style.wordWrap = 'normal';
        display.style.wordBreak = 'normal';
    }
}
toggleWordOrNumberDisplay('word');

let state = 'start';
function processInput(pointerEvent) {
    toggleWordOrNumberDisplay('number');
    const input = pointerEvent.currentTarget.textContent;
    if (state != 'number-operation-number' && input == '=') {
        ;//do nothing when the user accidentally presses '='.
    }
    else if (state == 'start') {
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
            display.textContent = parseFloat(firstNumber);
        }
        else if (isOperator(input)) {
            operator = input;
            state = 'number-operation';
            display.textContent = parseFloat(firstNumber) + operator;
        }
        else {
            resetCalculator();
        }
    }
    else if (state == 'number-operation') {
        if (isDigit(input)) { //
            secondNumber = secondNumber + input.toString();
            state = 'number-operation-number';
            display.textContent = parseFloat(firstNumber) + operator
                + parseFloat(secondNumber);
        }
        else {
            resetCalculator();
        }
    }
    else if (state == 'number-operation-number') {
        if (isDigit(input)) { //
            secondNumber = secondNumber + input.toString();
            state = 'number-operation-number';
            display.textContent = parseFloat(firstNumber) + operator
                + parseFloat(secondNumber);
        }
        else if (input == '=') {
            //compute and display
            let result = operate(operator, firstNumber, secondNumber);
            resetCalculator();
            if (result == "ERROR - cannot divide by 0") {
                toggleWordOrNumberDisplay('word');
            }
            display.textContent = result;
            //turn result of calculation into input for next one:
            firstNumber = result.toString();
            state = 'number';
        }
        else {
            resetCalculator();
        }
    }

    if (input != '=' && input != 'C') {
        pressSound.currentTime = 0;
        pressSound.play();
    }
    else {
        computeSound.currentTime = 0;
        computeSound.play();
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
    const operators = ['+', '-', '*', '/'];
    return operators.includes(input);
}

function isDigit(input) { //attach this to a button
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return digits.includes(parseInt(input));
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
    return (parseFloat(addend) + parseFloat(addend2));
}

const subtract = function (minued, subtrahend) {
    return (parseFloat(minued) - parseFloat(subtrahend));
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

computeSound = new Audio("button-22.mp3");
computeSound.volume = 0.15;
pressSound = new Audio("button-16.mp3");
pressSound.volume = 0.15;
