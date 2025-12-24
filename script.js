
const display = document.getElementById("display");
const historyBox = document.getElementById("history");

function press(value) {
  
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(value) && "+-*/".includes(lastChar)) {
    return;
  }
  
  
  if (display.value === "0" && value !== "." && value !== "/" && value !== "*" && value !== "+" && value !== "-") {
    display.value = value;
    return;
  }
  
  display.value += value;
}


function clearDisplay() {
  display.value = "";
}


function calculate() {
  try {
    const expression = display.value;
    
    
    if (!expression) {
      display.value = "undefined";
      return;
    }
    
    if (expression.match(/[+\-*/]$/)) {
      display.value = "Error";
      return;
    }
    
    
    const sanitized = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");
    
    const result = Function('"use strict"; return (' + sanitized + ')')();
    
    const formatted = Math.round(result * 100000000) / 100000000;
    display.value = formatted;

    const entry = document.createElement("div");
    entry.textContent = expression + " = " + formatted;
    historyBox.prepend(entry);
  } catch {
    display.value = "Error";
  }
}

function clearHistory() {
  historyBox.innerHTML = "";
}


function setTheme(theme) {
  document.body.className = theme;
}

document.addEventListener("keydown", (e) => {
  if ("0123456789.".includes(e.key)) press(e.key);  
  if ("+-*/".includes(e.key)) press(e.key);          
  if (e.key === "Enter") calculate();                
  if (e.key === "Backspace") display.value = display.value.slice(0, -1);  
  if (e.key === "Escape") clearDisplay();           
});
