const slider = document.querySelector("#slider");
const checkboxes = document.querySelectorAll(".checkbox");
const strengthLevelElement = document.querySelector("#strength-level");
const passwordInput = document.querySelector("#password-input");

slider.addEventListener("input", () => {
  const sliderValue = document.querySelector("#slider-value");
  sliderValue.innerHTML = slider.value;
});

slider.oninput = function () {
  const value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, var(--light-green) 0%, var(--light-green) " +
    value +
    "%, black " +
    value +
    "%, black 100%)";

  const strengthLevel = getStrengthLevel(
    Number(slider.value),
    getNumberOfCheckedCheckboxes()
  );
  setBarsColors(strengthLevel);
  strengthLevelElement.innerHTML = strengthLevel;
};

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].oninput = () => {
    const strengthLevel = getStrengthLevel(
      Number(slider.value),
      getNumberOfCheckedCheckboxes()
    );
    setBarsColors(strengthLevel);
    strengthLevelElement.innerHTML = strengthLevel;
  };
}

function getStrengthLevel(sliderValue, numberOfCheckedCheckboxes) {
  if (sliderValue < 8) return "TOO WEAK!";

  if (sliderValue < 10) {
    if (numberOfCheckedCheckboxes < 3) return "TOO WEAK!";
    return "WEAK";
  }

  if (sliderValue < 15) {
    if (numberOfCheckedCheckboxes < 3) return "WEAK";
    return "MEDIUM";
  }

  if (numberOfCheckedCheckboxes < 3) return "MEDIUM";

  return "STRONG";
}

function setBarsColors(strengthLevel) {
  const bars = document.querySelectorAll(".bar");
  let num;
  let color;

  if (strengthLevel === "TOO WEAK!") {
    num = 1;
    color = "rgb(255, 20, 20)";
  }

  if (strengthLevel === "WEAK") {
    num = 2;
    color = "rgb(165, 42, 42)";
  }

  if (strengthLevel === "MEDIUM") {
    num = 3;
    color = "goldenrod";
  }

  if (strengthLevel === "STRONG") {
    num = 4;
    color = "var(--light-green)";
  }

  for (let i = 0; i < bars.length; i++) {
    if (i < num) {
      bars[i].style.backgroundColor = color;
      bars[i].style.borderColor = color;
    } else {
      bars[i].style.backgroundColor = "var(--bg-color)";
      bars[i].style.borderColor = "var(--bg-color)";
    }
  }
}

function getNumberOfCheckedCheckboxes() {
  let numberOfCheckedCheckboxes = 0;

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) numberOfCheckedCheckboxes++;
  }

  return numberOfCheckedCheckboxes;
}

function generatePassword(
  length,
  includeUpperCaseLetters,
  includeLowerCaseLetters,
  includeNumbers,
  includeSymbols
) {
  const numbers = "0123456789";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const allCharacters = numbers + lowerCaseLetters + upperCaseLetters + symbols;
  const allCharactersLength = allCharacters.length;

  let password = [];

  if (includeUpperCaseLetters) {
    password.push(
      upperCaseLetters.charAt(
        Math.floor(Math.random() * upperCaseLetters.length)
      )
    );
  }

  if (includeLowerCaseLetters) {
    password.push(
      lowerCaseLetters.charAt(
        Math.floor(Math.random() * lowerCaseLetters.length)
      )
    );
  }

  if (includeNumbers) {
    password.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
  }

  if (includeSymbols) {
    password.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
  }

  for (let i = password.length; i < length; i++) {
    password.push(
      allCharacters.charAt(Math.floor(Math.random() * allCharactersLength))
    );
  }

  password = password.sort(() => Math.random() - 0.5);

  return password.join("");
}

function displayPassword() {
  const length = Number(slider.value);

  const strengthLevel = getStrengthLevel(
    length,
    getNumberOfCheckedCheckboxes()
  );

  if (strengthLevel === "TOO WEAK!") return null;

  let conditions = [];

  const includeUpperCaseLetters = document.querySelector(
    "#uppercase-letters-checkbox"
  ).checked;

  const includeLowerCaseLetters = document.querySelector(
    "#lowercase-letters-checkbox"
  ).checked;

  const includeNumbers = document.querySelector("#numbers-checkbox").checked;

  const includeSymbols = document.querySelector("#symbols-checkbox").checked;

  includeUpperCaseLetters ? conditions.push(true) : conditions.push(false);
  includeLowerCaseLetters ? conditions.push(true) : conditions.push(false);
  includeNumbers ? conditions.push(true) : conditions.push(false);
  includeSymbols ? conditions.push(true) : conditions.push(false);

  const password = generatePassword(length, ...conditions);

  passwordInput.value = password;
}

function copyPasswordToClipboard() {
  navigator.clipboard.writeText(passwordInput.value);
}
