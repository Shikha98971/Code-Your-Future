let currentInput = '';  // To hold the current input on the display
let operator = '';  // To store the operator (e.g., +, -, *, /)
let previousInput = '';  // To store the previous input before operator

// Function to append numbers or operators to the display
function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    document.getElementById('display').value = '';
}

// Function to calculate the result
function calculate() {
    try {
        // Use the eval function to evaluate the expression
        currentInput = eval(currentInput).toString();
        document.getElementById('display').value = currentInput;
    } catch (error) {
        document.getElementById('display').value = 'Error';
        currentInput = '';  // Reset the input after error
    }
}
