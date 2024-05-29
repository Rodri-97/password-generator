const slider = document.querySelector("#slider");
const checkboxes = document.querySelectorAll(".checkbox");
const strengthLevelElement = document.querySelector("#strength-level");

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
  if (sliderValue < 7) return "TOO WEAK!";

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
