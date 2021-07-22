'use strict';

const btn = document.getElementById('btn');
const btn2 = document.getElementById('btn2');
const text = document.querySelector('.text');

// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   const curLocation = await getLocation();
//   console.log(curLocation);
//   const { latitude: lat, longitude: lng } = curLocation.coords;

//   const revGeo = await fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=169542281086562212905x84985`
//   );
//   const geoJSON = await revGeo.json();
//   console.log(geoJSON);
//   text.textContent = `You are in ${geoJSON.city}, ${geoJSON.statename}`;
// };

const whereAmIApp = {
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  },

  async whereAmI() {
    const curLocation = await this.getLocation();
    console.log(curLocation);
    const { latitude: lat, longitude: lng } = curLocation.coords;

    const revGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=169542281086562212905x84985`
    );
    const geoJSON = await revGeo.json();
    console.log(geoJSON);
    text.textContent = `You are in ${geoJSON.city}, ${geoJSON.statename}`;
  },
};

cheese.focus();

const isItACheese = {
  cheeseBox: document.getElementById('cheese'),
  async checkCheese() {
    const cheese = this.cheeseBox.value;
    const cheeseData = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=pUObyb1y4ANkuLuJjUpRtYzy76u3p59iEja90ayw&query=${cheese}&pageSize=5`
    );
    const cheeseJSON = await cheeseData.json();
    const formattedCheeseStr =
      cheese.slice(0, 1).toUpperCase() + cheese.slice(1).toLowerCase();
    if (cheese === '') return;
    const cheeseBoolean = cheeseJSON.foods.reduce((acc, cur) => {
      return cur.foodCategory === 'Cheese' ? (acc = true) : acc;
    }, false);
    cheeseBoolean
      ? (text.textContent = `${formattedCheeseStr} is a cheese!`)
      : (text.textContent = `${formattedCheeseStr} is NOT a cheese!`);
  },
};

btn.addEventListener('click', whereAmIApp.whereAmI.bind(whereAmIApp));
btn2.addEventListener('click', isItACheese.checkCheese.bind(isItACheese));
window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') isItACheese.checkCheese.bind(isItACheese)();
});
