//goal: cause a pressed button's text to appear on the
//  display element

//activate display:
//grab display element
function activateDisplayForOneButton() { //will use this later
    const display = document.querySelector('#display');

    //grab a button
    const btn = document.querySelector('button'); //the first button
    btn.addEventListener('click', displayMyText);
}

function displayMyText() { //sets display element's text content to button
    const buttonText = btn.textContent; //grab button's text
    //change display's text content
    display.textContent = buttonText;//set display's text to button's
}

//goal: create a log of all user inputs (clicks)
let activityLog = ''; //each user-click should append something here
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

function sum(addend, addend2) {
    return (addend + addend2);
}