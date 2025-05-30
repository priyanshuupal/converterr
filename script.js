const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const url = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  try {
    // Fetch the data from the API
    const response = await fetch(url);

    // Convert the response to JSON (like a JavaScript object)
    const data = await response.json();
    const exchangeRate = data.rates[toCurr.value];
    msg.innerText = `${amtVal} ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
    // console.log(`${amtVal} ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`);

  } catch (error) {
    // If there's an error (like no internet), this will run
    console.log("Something went wrong:", error);
    msg.innerText = `Failed to fetch`
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

