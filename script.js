let allBtns = document.querySelector(".button-container");
let numBtns = document.querySelectorAll(".number");
let operatorBtns = document.querySelectorAll(".operator");
let equalsBtn = document.getElementById("equals");
let delBtn = document.getElementById("delete");
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
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

//Input Digit
function inputDigit(digit) {
  let { displayValue } = calculator;
  if (displayValue === "0") {
    calculator.displayValue = digit;
  } else {
    calculator.displayValue = displayValue + digit;
  }
  console.log(calculator);
}

//handle operator
function handleOperator(nextOperator) {
  let { firstOperand, displayValue, operator } = calculator;
  let inputValue = Number(displayValue);
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}
