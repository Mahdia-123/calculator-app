const display = document.querySelector(".display");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".numbers button");

let expression = "";

// Update display
function updateDisplay() {
    display.textContent = expression || "0";
}

// Calculate only when = is pressed
function calculate() {
    if (!expression) {
        result.textContent = "0";
        return;
    }

    try {
        let fixed = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        let answer = eval(fixed);

        // Invalid math
        if (!isFinite(answer)) {
            result.textContent = "Error";
            return;
        }

        // Shorten long decimals
        if (!Number.isInteger(answer)) {
            answer = Number(answer.toFixed(6));
        }

        // Convert very long numbers
        result.textContent =
            answer.toString().length > 12
                ? answer.toExponential(4)
                : answer;

    } catch {
        result.textContent = "Error";
    }
}

// Initial state
updateDisplay();
result.textContent = "0";

// Buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        // AC
        if (value === "AC") {
            expression = "";
            updateDisplay();
            result.textContent = "0";
            return;
        }

        // Backspace
        if (button.querySelector("span")) {
            expression = expression.slice(0, -1);

            updateDisplay();

            if (!expression) {
                result.textContent = "0";
            }

            return;
        }

        // Equals
        if (value === "=") {
            calculate();
            return;
        }

        // Toggle sign
        if (value === "+/-") {
            if (expression) {
                expression = expression.startsWith("-")
                    ? expression.slice(1)
                    : "-" + expression;

                updateDisplay();
            }

            return;
        }

        // Prevent multiple decimals
        if (
            value === "." &&
            expression.split(/[\+\-\*\/]/).pop().includes(".")
        ) {
            return;
        }

        // Add input
        expression += value;

        updateDisplay();
    });
});