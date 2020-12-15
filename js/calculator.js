const technologiesSelect = document.querySelector(
  "#calculator-form-technologies"
);

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});
const calculatorForm = document.querySelector(".calculator-form");
calculate();
function calculate() {
  // -----SELECTORS-----//
  const websiteTypeSelect = document.querySelector(
    "#calculator-form-website-type"
  );

  const websiteCart = document.querySelector(
    "#calculator-form-input-cart input:checked"
  );
  const websiteReception = document.querySelector(
    "#calculator-form-input-reception input:checked"
  );

  //----VALUES---//
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);

  const technologiesValue = getTechnologiesSum(
    technologiesMultiSelect.getValue()
  );

  const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
  const websiteReceptionValue = convertReceptionOptionToPrice(
    websiteReception.value
  );

  let cost =
    websiteTypeValue +
    technologiesValue +
    websiteCartValue +
    websiteReceptionValue;

  // console.log(calculatorForm);
  renderCost(cost);
}

calculatorForm.addEventListener("submit", function (event) {
  event.preventDefault();
  calculate();
});

// экстракция с велью цены(мой вариант установить data-price и с помощью гетАттр получить)
function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}
// получение цены с мультиинпута технологий
function getTechnologiesSum(technologiesArr) {
  let totalSum = 0;

  technologiesArr.forEach(function (tech) {
    totalSum = totalSum + extractPriceFromValue(tech.value);
  });
  return totalSum;
}

// конвертация YES/NO в цену (зачем, можно было в велью присвоить ценник)
function convertCartOptionToPrice(option) {
  if (option === "yes") {
    return 300;
  }
  return 0;
}
function convertReceptionOptionToPrice(option) {
  if (option === "yes") {
    return 500;
  }
  return 0;
}
function renderCost(sum) {
  document.querySelector(".calculator-form-total-cost").innerHTML =
    "Calculating...";
  setTimeout(function () {
    document.querySelector(".calculator-form-total-cost").innerHTML = sum + "$";
  }, 1500);
}
