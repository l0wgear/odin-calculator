let first = "";
let second = "";
let operator = "";
let lastResult = 0;

const displayText = document.getElementById("display-text");
const displayOperator = document.getElementById("display-operator");

function handleNumberClick(e) {
  if (operator === "") {
    if (e.target.value === ".") {
      if (first.indexOf(".") === -1) first = first.concat(".");
    } else {
      if (first[0] === "0" && first.indexOf(".") === -1) first = e.target.value;
      else first = first.concat(e.target.value);
    }
    displayText.textContent = first;
  } else {
    if (e.target.value === ".") {
      if (second.indexOf(".") === -1) second = second.concat(".");
    } else {
      if (second[0] === "0" && second.indexOf(".") === -1)
        second = e.target.value;
      else second = second.concat(e.target.value);
    }
    displayText.textContent = second;
  }
}

function handleOperatorClick(e) {
  if (e.target.value !== "=") {
    if (lastResult !== 0) {
      first = String(lastResult);
      operator = e.target.value;
    } else if (first !== "" && second !== "") {
      let result = calculate(first, second, operator);
      resetVariables();
      operator = e.target.value;
      first = String(result);
      displayText.textContent = result;
    }
    operator = e.target.value;
    displayOperator.textContent = operator;
  } else {
    let result = calculate(first, second, operator);
    resetVariables();
    lastResult = result;
    displayText.textContent = result;
  }
}

function calculate(first, second, operator) {
  first = Number(first);
  if (second === "") return first;
  else second = Number(second);
  if (operator === "+") return first + second;
  else if (operator === "-") return first - second;
  else if (operator === "*") return first * second;
  else if (operator === "/" && second !== 0) return first / second;
  else return "error";
}

function resetVariables() {
  first = "";
  second = "";
  operator = "";
  lastResult = 0;
  displayOperator.textContent = "";
  displayText.textContent = "0";
}

const numberButtons = document.querySelectorAll(".number-container button");
numberButtons.forEach((btn) =>
  btn.addEventListener("click", handleNumberClick)
);
const operatorButtons = document.querySelectorAll(".operator-container button");
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", handleOperatorClick)
);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  resetVariables();
  //   displayText.textContent = "0";
});
