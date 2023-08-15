const resultCount = document.getElementById("result");
const operationCount = document.querySelector(".operation");
const numberBtn = document.querySelectorAll(".number");
const symbolBtn = document.querySelectorAll(".symbol");
const downBtn = document.querySelector(".down");
const historyCount = document.querySelector(".history");
const submitBtn = document.getElementById("submit");

let pickNumber = "";

numberBtn.forEach((oneNumber) => {
  oneNumber.addEventListener("click", () => {
    pickNumber += oneNumber.textContent + "";

    resultCount.innerText = pickNumber;
    return pickNumber;
  });
});

symbolBtn.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    let endSymbol = pickNumber.match(/[x|:|+|-]$/);
    if (endSymbol) {
      pickSymbol = symbol.textContent;
      pickNumber = resultCount.textContent;
      pickNumber = pickNumber.replace(/[x|:|+|-]$/, pickSymbol);
    } else {
      pickNumber += symbol.textContent + "";
    }
    resultCount.innerText = pickNumber;
  });
});

submitBtn.addEventListener("click", () => {
  try {
    pickNumber = pickNumber.replace("x", "*");
    pickNumber = pickNumber.replace(":", "/");
    pickNumber = pickNumber.replace(",", ".");

    function calculate() {
      fixNumber = eval(pickNumber).toString();
      fixNumber = fixNumber.replace(".", ",");
      resultCount.innerText = fixNumber;

      if (fixNumber == "Infinity") {
        fixNumber = "";
      }
      updateOperationCount();
      updateHistoryCount(pickNumber, fixNumber);
    }

    calculate();
    return (pickNumber = fixNumber);
  } catch (error) {
    resultCount.innerText = "error";
    return (pickNumber = "");
  }
});

const clearDisplay = () => {
  resultCount.innerText = "";
  operationCount.innerText = "Calculator";
  return (pickNumber = "");
};

const deleteValue = () => {
  currentValue = resultCount.textContent;
  const newValue = currentValue.slice(0, -1);
  resultCount.innerText = newValue;
  return (pickNumber = newValue);
};

const updateOperationCount = () => {
  pickNumber = pickNumber.replace("*", "x");
  pickNumber = pickNumber.replace("/", ":");
  pickNumber = pickNumber.replace(".", ",");

  operationCount.innerText = pickNumber + " =";
};

downBtn.addEventListener("click", () => {
  historyCount.classList.toggle("active");
});

const updateHistoryCount = (operation, result) => {
  if (operation !== result) {
    const historyOperations = document.createElement("p");
    const historyResult = document.createElement("p");

    historyOperations.className = "operations";
    historyOperations.innerText = `${operation} =`;
    if (result == "") {
      result = "Infinity";
    }
    historyResult.className = "results";
    historyResult.innerText = result;

    const firstElement = historyCount.children[1];
    historyCount.insertBefore(historyResult, firstElement);
    historyCount.insertBefore(historyOperations, historyResult);
  }
};
