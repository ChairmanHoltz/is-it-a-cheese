"use strict";

const isItACheese = {
  cheeseBox: document.getElementById("cheese"),
  tryAgainBtn: document.getElementById("try_again"),
  btn: document.getElementById("btn"),
  text: document.querySelector(".text"),
  async checkCheese() {
    const cheese = this.cheeseBox.value;
    const cheeseData = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=pUObyb1y4ANkuLuJjUpRtYzy76u3p59iEja90ayw&query=${cheese}&pageSize=5`
    );
    const cheeseJSON = await cheeseData.json();
    const formattedCheeseStr =
      cheese.slice(0, 1).toUpperCase() + cheese.slice(1).toLowerCase();
    if (cheese === "") return;
    const cheeseBoolean = cheeseJSON.foods.reduce((acc, cur) => {
      return cur.foodCategory === "Cheese" ? (acc = true) : acc;
    }, false);
    cheeseBoolean
      ? (this.text.textContent = `${formattedCheeseStr} is a cheese!`)
      : (this.text.textContent = `${formattedCheeseStr} is NOT a cheese!`);
    this.showTryAgainBtn();
  },
  showTryAgainBtn() {
    this.tryAgainBtn.style.display = "block";
    this.tryAgainBtn.focus();
  },
};

isItACheese.btn.addEventListener(
  "click",
  isItACheese.checkCheese.bind(isItACheese)
);
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") isItACheese.checkCheese.bind(isItACheese)();
});
isItACheese.tryAgainBtn.addEventListener("click", function () {
  location.reload();
});
isItACheese.cheeseBox.value = '';
isItACheese.cheeseBox.focus();
