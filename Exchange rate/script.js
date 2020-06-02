//Variable  declaration
const currencyOne = document.getElementById("currencyOne");
const currencyTwo = document.getElementById("currencyTwo");
const firstAmount = document.getElementById("firstAmount");
const secondAmount = document.getElementById("secondAmount");
const swap = document.getElementById("swap");
const rateContainer = document.getElementById("rate");

//Calculate exchange rate function
function calculate() {
  const firstCurrencyvalue = currencyOne.value;
  const secondCurrencyvalue = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrencyvalue}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[secondCurrencyvalue];

      rateContainer.innerText = `1 ${firstCurrencyvalue} is ${rate} ${secondCurrencyvalue} `;

      secondAmount.value = (firstAmount.value * rate).toFixed(2);

      console.log(secondAmount.value);
    });
}

//Event listeners
currencyOne.addEventListener("change", calculate);
firstAmount.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
secondAmount.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
