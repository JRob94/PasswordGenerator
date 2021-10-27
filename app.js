// PASSWORD GENERATOR

// Character generator functions 

// Function that accepts a string value as an argument and returns a random index number from the string argument
function randomIndex(str){
    return Math.floor(Math.random() * str.length);
}

// Function that returns a random lowercase letter
function getRandomLower(){
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    // Returning a random number using a random index in the "letters" string
    return letters[randomIndex(letters)];
}

// Function that returns a random uppercase letter
function getRandomUpper(){
    // Running the getRandomLower function to create a random letter and setting that value to the letter variable
    const letter = getRandomLower();
    // Changing the random letter to an uppercase letter and returning it from the function
    return letter.toUpperCase();
}

// Function that returns a random number
function getRandomNumber(){
    const numbers = `0123456789`;
    // returns a random number using randomIndex in the numbers string
    return numbers[randomIndex(numbers)];
}

// Function that returns a random symbol
function getRandomSymbol(){
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    // returns a random symbol using randomIndex in the symbols string
    return symbols[randomIndex(symbols)];
}


// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Selecting the DOM Elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);


// Function that accepts true or false values as well as a number as arguments
// The checkbox inputs and number input will determine the values/arguments entered into this function
function generatePassword(lower, upper, number, symbol, length){

    console.log(lower, upper, number, symbol, length);

    // 1. CREATE THE PASSWORD VARIABLE
    let generatedPassword = ``;

    // 2. FILTER OUT UNCHECKED OPTIONS

    // True and false values can be added together (True is 1 and false is 0)
    // The value set to typesCount will be used when building the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    // If the user has not selected any of the four options, then display alert and return an empty string from the function so the password displayed will just be an empty string
    if (typesCount === 0){
        alert(`Please select at least one option`);
        // The return keyword stops/ends the execution of a function (Does not run any of the code on the lines that follow the return in the function)
        return ``;
    }

    // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunction object. Also, the second item in each nested array is one of the values passed into this generatePassword function.
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];

    // The filter method creates a new array with all the items that pass the test implemented by the provided function (All the items that cause the function to return a boolean value of true when the function is run using the item as an argument for the item parameter in this example)
    // Checking if the value for index of 1 in each item in the array is true or false. Also, removing the item from the array if it is false.
    typesArr = typesArr.filter(item => {
        console.log(item[1]);
        return item[1];
    });
    console.log(`typesArr:`, typesArr);

    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION

    // Building password with a for loop 
    // The value for length is the value selected for the length number input
    for (i = 0; i < length; i += typesCount){
        // One of the items i the updated/filtered version of the typesArr will be the value/argument passed into the type parameter each time the anonymous arrow function is run/executed
        typesArr.forEach(type => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running/executing a function in the randomFunctions object. Also, adding the value returned from the accessed function to the generatedPassword string variable
            generatedPassword += randomFunctions[funcName]();
            console.log(generatedPassword);
        });
    }

    // 4. ADD THE GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT FROM THE FUNCTION
    // REmoving extra characters if necessary ( The above loop will create a password  that may not match the length selected if that length is not a multiple of the number of options/checkboxes selected)
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);

    return finalPassword;
}