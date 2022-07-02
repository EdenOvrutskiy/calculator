//JUST CHECKING IF BRANCHING WORKS

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

let firstNumber = '';//a string: appending digits acts like 
//contcatenation, not addition.
let secondNumber = '';
let operator = '';

//the calculator's state determines what it currently 
//'remembers',and in turn how it will respond to incoming input.
//each button click sets the state for the next click to use
//see new_state_machine.png for a visual representation
const states = ['number1', 'number2'];

let firstDotUsed = false; //(a flag to prevent double tapping '.')
let secondDotUsed = false; //(a flag to prevent double tapping '.')

//make welcome message presentable
toggleDisplayMode('word');

let state = 'number1';

for (button of buttons) {
    button.addEventListener('click', processInput);
}


function processInput(pointerEvent) { //after a key is pressed..
    //display numbers correctly (user input, results of calculations)
    toggleDisplayMode('number');
    //a button press is considered the user's input
    //find out what it is by grabbing the text content of the element
    //from addEventListener
    const input = pointerEvent.currentTarget.textContent;
    if (state == 'number1') {
        if (isDigit(input)) {
            firstNumber = firstNumber + input.toString(); //appending 
            //digits works like contacetantion, not addition
            display.textContent = parseFloat(firstNumber);
        }
        else if (input == '.') {
            if (firstNumber.length >= 1 && firstDotUsed == false) {
                firstNumber = firstNumber + input.toString();
                display.textContent = parseFloat(firstNumber) + '.';
                firstDotUsed = true;
            }
        }
        else if (input == '=') {
            ;//do nothing
        }
        else if (isOperator(input) && firstNumber.length >= 1) {
            operator = input;
            state = 'number2';
            display.textContent = parseFloat(firstNumber) + operator;
        }
        else if (input == 'C') {//if C was pressed
            firstNumber = 0;
            secondNumber = '';
            operator = '';
            firstDotUsed = false;
            secondDotUsed = false;
            display.textContent = parseFloat(firstNumber);
        }
        else {
            console.log("some kind of error " +
                "has occured on number1 state's function");
            console.log("resetting anyway");
            firstNumber = 0;
            secondNumber = '';
            operator = '';
            firstDotUsed = false;
            secondDotUsed = false;
            display.textContent = parseFloat(firstNumber);
            return -1;
        }
    }
    else if (state == 'number2') {
        //after we have first number + operator
        //firstNumber becomes second number
        if (isDigit(input)) {
            secondNumber = secondNumber + input.toString();
            display.textContent = parseFloat(firstNumber) + operator
                + parseFloat(secondNumber);
        }
        else if (input == '.') {
            if (secondNumber.length >= 1 && secondDotUsed == false) {
                secondNumber = secondNumber + '.';
                display.textContent = firstNumber + operator + secondNumber;
                secondDotUsed = true;
            }
        }
        else if (input == '=' && secondNumber.length >= 1) {
            //compute and display
            let result = operate(operator, firstNumber, secondNumber);
            if (result == "ERROR - cannot divide by 0") {
                toggleDisplayMode('word');
                resetCalculator();
                display.textContent = result;
            }
            else {
                display.textContent = result;
                //turn result of calculation into input for next one:
                firstNumber = result.toString();
                secondNumber = '';
                state = 'number1';
                //prevent a dot that's carried over from the previous
                //calculation from being ignored:
                if (firstNumber.includes('.')) {
                    firstDotUsed = true;
                }
                else {
                    firstDotUsed = false;
                }
                secondDotUsed = false;
            }
        }
        else { //if faulty input, reset everything
            firstNumber = '0';
            secondNumber = '';
            operator = '';
            firstDotUsed = false;
            secondDotUsed = false;
            display.textContent = parseFloat(firstNumber);
        }
    }
    //play a sound depending on the button pressed
    if (input != '=' && input != 'C') {
        pressSound.currentTime = 0;
        pressSound.play();
    }
    else {
        computeSound.currentTime = 0;
        computeSound.play();
    }
}
function resetDotFlags() {
    firstDotUsed = false;
    secondDotUsed = false;
}

function resetCalculator() {
    state = 'number1';
    firstNumber = 0;
    secondNumber = '';
    operator = '';
    resetDotFlags();
    display.textContent = firstNumber;
}

function toggleDisplayMode(mode) {//display numbers and text properly
    if (mode == 'number') {
        //causes long numbers to take up multiple lines
        display.style.wordWrap = 'break-word';
        display.style.wordBreak = 'break-all';
    }
    else if (mode == 'word') {
        //prevent words from breaking at:welcome message, div 0 error..)
        display.style.wordWrap = 'normal';
        display.style.wordBreak = 'normal';
    }
    else {
        console.log("Error toggling display mode");
    }
}

function isOperator(input) { //attach this to a button
    const operators = ['+', '-', '*', '/'];
    return operators.includes(input);
}

function isDigit(input) { //attach this to a button
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return digits.includes(parseInt(input));
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
