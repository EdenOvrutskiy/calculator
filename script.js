console.log("hi");

//activate display:
//cause a pressed button's text to appear on the
//display element

//grab display element
const display = document.querySelector('#display');
console.log(display);

//grab a button
const btn = document.querySelector('button'); //the first button
console.log(btn);

//add an event listener for button being clicked:
btn.addEventListener('click', displayMe);

function displayMe() { //sets display element's text content to button
    const buttonText = btn.textContent;
    console.log('my text content: ', buttonText);
    //change display's text content
    display.textContent = buttonText;
}
//this can be repeated for all the buttons...

//the purpose of pressing a button is to eventually execute
//some function, with said button's value as an input.

//so I can't go wrong with creating some math functions:

//let's start with addition:

function sum(addend, addend2) {
    return (addend + addend2);
}

//now I'd like the plus sign to invoke said function..

//current goal: pressing the sequence: `1, +, 1, = ` should
//output 2.

//does the program need to remember a 4-length sequence of
//key pressed, and expect it?
