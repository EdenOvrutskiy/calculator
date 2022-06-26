//avoid shared variables, minimize parameters


//goal: cause a pressed button's text to appear on the
//  display element
/////////////// 
//mandatory variables
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let activityLog = ''; //each user-click should append something here

//mandatory functions
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