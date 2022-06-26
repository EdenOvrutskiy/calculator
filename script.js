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
    button.addEventListener('click', log);
    //    button.addEventListener('click', updateDisplay);
}

function log(pointerEvent, activityLog) {
    //pointerEvent is passed byt addEventListener 
    button = pointerEvent.target;//extract button DOM from click event
    activityLog += button.textContent; //append it's content to a log
    return activityLog;
}

//function activateDisplay() { }


/*
/////////////

//activate display:
//grab display element
activateDisplay();
function activateDisplay() { //will use this later
    const display = document.querySelector('#display');

    //grab all buttons
    let btns = document.querySelectorAll('button');

    //do something when a button is clicked
    for (button of btns) {
        button.addEventListener('click', displayMyText(display));
        //console.log(button);
    }
}

function displayMyText(pointerEvent, display) { //sets display element's text content to button
    const btn = pointerEvent.target;
    //const buttonText = btn.textContent; //grab button's text
    console.log(display);
    //change display's text content
    //display.textContent = buttonText;//set display's text to button's
    //console.log(display.textContent);
}

//goal: create a log of all user inputs (clicks)
//let activityLog = ''; //each user-click should append something here
//grab all buttons
let btns = document.querySelectorAll('button'); //the first button

//do something when a button is clicked
for (button of btns) {
    button.addEventListener('click', log);
    //console.log(button);
}
//add a logging eventListener
function log(pointerEvent) {//pointerEvent passed by addEventListener
    btn = pointerEvent.target;//extract button DOM from click event
    activityLog += btn.textContent; //append it's content to a log
    console.log(activityLog);
}

*/
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