const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

//TODO: 

//stylize
//flexible display might not be bad :
//  https://michalosman.github.io/calculator/
//  limit size of result somehow?
//  limit calculator display size?

//make buttons bigger 
//align buttons
//order buttons into a keypad arrangement


//javascript
//use typeOf in isDigit() ?

//could organize the program based on the input type,
//instead of the various states.
//  this could help with negating '=' effects

//pressing a number and then '=' should just let the 
//number be? ... 

//it could re-do the last action, like some calculators
//do..

//some extra info at the top of the number - about
//what's being computed..

//pressing an operation instead of '=' should 
//initial chain computation

//potentially get rid of "number2" variable?

//reduce code duplication 

//no floating-point numbers?

//some code that describes the 'clear' button's purpose and
//behavior, instead of just letting it work as a side effect
//of not being accounted for?

//something other than 'start' -> like some error message..
//move from "states"/ "state machine" to some code
//that better describes itself?

//could make the program more self-describing by
//creating an object {} with the keys [firstNumber] : ..
//[oprator] : null / '+'
//and that would show what each state really means
//and then a function could be run to check the state
//depending of the object's contents


//////////////

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
    if (state != 'number-operation-number' && input == '=') {
        ;//do nothing when the user accidentally pressed '='.
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
            //turn result of calculation into input for next one:
            firstNumber = result.toString();
            state = 'number';
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