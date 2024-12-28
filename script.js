// Function to convert Fahrenheit to Celsius
function convertToCelsius() {
    const temperature = document.getElementById('temperature').value;
    if (temperature !== '') {
        const celsius = (temperature - 32) * 5 / 9;
        document.getElementById('result').innerHTML = `<p>${temperature}°F is equal to ${celsius.toFixed(2)}°C</p>`;
    } else {
        alert('Please enter a temperature value.');
    }
}

// Function to convert Celsius to Fahrenheit
function convertToFahrenheit() {
    const temperature = document.getElementById('temperature').value;
    if (temperature !== '') {
        const fahrenheit = (temperature * 9 / 5) + 32;
        document.getElementById('result').innerHTML = `<p>${temperature}°C is equal to ${fahrenheit.toFixed(2)}°F</p>`;
    } else {
        alert('Please enter a temperature value.');
    }
}
