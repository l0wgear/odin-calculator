let first = "";
let second = "";
let operator = "";
let lastResult = 0;

const displayText = document.getElementById("display-text");
const displayOperator = document.getElementById("display-operator");

function handleNumberClick(e) {
  if (operator === "") {
    first = updateValue(first, e);
    displayText.textContent = first;
  } else {
    second = updateValue(second, e);
    displayText.textContent = second;
  }
}

function updateValue(variable, e) {
  if (e.target.value === ".") {
    if (variable.indexOf(".") === -1) variable = variable.concat(".");
  } else if (e.target.value === "+-") {
    return String(-variable);
  } else {
    if (variable.length > 11) return variable;
    if (variable[0] === "0" && variable.indexOf(".") === -1)
      variable = e.target.value;
    else variable = variable.concat(e.target.value);
  }
  return variable;
}

function handleOperatorClick(e) {
  if (e.target.value !== "=") {
    if (first !== "" && second !== "") {
      let result = calculate(first, second, operator);
      resetVariables();
      //   lastResult = res
      operator = e.target.value;
      first = String(result);
      displayText.textContent = result;
    } else if (lastResult !== 0) {
      first = String(lastResult);
      operator = e.target.value;
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
  const round = (num) => Math.round(num * 1000000000) / 1000000000;

  first = Number(first);

  if (second === "") return first;
  else second = Number(second);

  if (operator === "+") return round(first + second);
  else if (operator === "-") return round(first - second);
  else if (operator === "*") return round(first * second);
  else if (operator === "/" && second !== 0) return round(first / second);
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
clearButton.addEventListener("click", () => resetVariables());
