// switch darkmode

const themeToggle = document.getElementById('slider');

function toggleTheme() {
    const isDarkMode = themeToggle.checked;

    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');

    const elementsToToggle = [
        'card-light-mode', 'ageContainer-light-mode',
        'genderContainer-light-mode', 'weightContainer-light-mode',
        'heightContainer-light-mode', 'resultContainer-light-mode', 'calculate-light-mode', 'inputheight-light-mode', 'inputweight-light-mode', 'inputage-light-mode',
    ];

    elementsToToggle.forEach(className => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            element.classList.toggle(className.replace('-light-mode', '-dark-mode'), isDarkMode);
        }
    });

    const calculateButton = document.querySelector('.calculate-light-mode');
    if (calculateButton) {
        calculateButton.classList.toggle('hover', isDarkMode);
    }

    updateSocialIcons(isDarkMode);

    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
}

function updateSocialIcons(isDarkMode) {
    const socialLogos = document.querySelectorAll('.icons');
    socialLogos.forEach(logo => {
        logo.classList.toggle('icons-dark', isDarkMode);
    });
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeToggle.checked = savedTheme === 'dark-mode';
        toggleTheme();
    }
}

themeToggle.addEventListener('change', toggleTheme);

checkTheme();

// Main script

function calculateBMI() {
    const age = getInputValueAsNumber("age");
    const gender = getSelectedGender();
    const height = getInputValueAsNumber("height") / 100;
    const weight = getInputValueAsNumber("weight");

    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        alert("Please enter valid values.");
        return;
    }

    if (!gender) {
        alert("Please select your gender.");
        return;
    }

    let imc = 0;

    if (gender === "male") {
        imc = calculateMaleBMI(height, weight);
    } else if (gender === "female") {
        imc = calculateFemaleBMI(age, height, weight);
    }

    if (!isNaN(imc)) {
        displayBMIResult(imc);
    } else {
        alert("Error: Unable to calculate BMI. Please ensure all fields are filled correctly.");
    }
}

function getInputValueAsNumber(inputId) {
    return parseFloat(document.getElementById(inputId).value);
}

function getSelectedGender() {
    const genderElements = document.querySelectorAll('input[name="gender"]');
    let selectedGender = null;
    genderElements.forEach(element => {
        if (element.checked) {
            selectedGender = element.value;
        }
    });
    return selectedGender;
}

function calculateMaleBMI(height, weight) {
    return weight / Math.pow(height, 2);
}

function calculateFemaleBMI(age, height, weight) {
    return (weight / Math.pow(height, 2)) + (age / 10);
}

function displayBMIResult(imc) {
    document.getElementById("result").innerText = "Your BMI:";
    document.getElementById("imc").innerText = imc.toFixed(2);

    let category = "";

    if (imc < 18.5) {
        category = "Underweight";
    } else if (imc < 25) {
        category = "Normal weight";
    } else if (imc < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    document.getElementById("category").innerText = "Category: " + category;
    updateResultContainerColor(imc);
}

function updateResultContainerColor(imc) {
    const resultContainer = document.getElementById("resultContainer");
    if (imc < 18.5) {
        resultContainer.style.backgroundColor = "blue";
    } else if (imc < 25) {
        resultContainer.style.backgroundColor = "green";
    } else if (imc < 30) {
        resultContainer.style.backgroundColor = "orange";
    } else {
        resultContainer.style.backgroundColor = "red";
    }
}
