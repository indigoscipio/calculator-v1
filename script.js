let allBtns = document.querySelector(".button-container");
let numBtns = document.querySelectorAll(".number");
let operatorBtns = document.querySelectorAll(".operator");
let equalsBtn = document.getElementById("equals");
let delBtn = document.querySelector(".delete");
let clearBtn = document.getElementById("clear");
let calcDisplay = document.querySelector(".calculator-display");

let calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  calcDisplay.value = calculator.displayValue;
}

//Handle Key press
allBtns.addEventListener("click", (e) => {
  let { target } = e;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    console.log("clear", target.value);
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

//Input Digit
function inputDigit(digit) {
  let { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    if (displayValue === "0") {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue = displayValue + digit;
    }
  }
  console.log(calculator);
}

//handle operator
function handleOperator(nextOperator) {
  let { firstOperand, displayValue, operator } = calculator;
  let inputValue = Number(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    let result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

//reset calculator
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

//calculate function
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}
