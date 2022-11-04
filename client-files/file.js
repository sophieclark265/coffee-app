function containerFunction() {
  let drinkersSelected = document.getElementById("drinkers-selector");
  let drinksSelected = document.getElementById("freq-selector");
  let priceSelected = document.getElementById("drink-price-selector");
  let budgetSelected = document.getElementById("espresso-selector");
  let altMilkPrompt = document.getElementById("milk-question");
  let beanCustomizer = document.getElementById("bean-price-changer");

  drinkersSelected.addEventListener("click", showUserSelections);
  drinksSelected.addEventListener("click", showUserSelections);
  priceSelected.addEventListener("click", showUserSelections);
  budgetSelected.addEventListener("click", showUserSelections);
  altMilkPrompt.addEventListener("click", displayMilks);
  beanCustomizer.addEventListener("click", createNumberInput);

  let coffeeBagsPerYearH5 = document.getElementById("coffee-bags");
  let yearlyBeansCostH5 = document.getElementById("beans-cost");
  let yearlyPriceP = yearlyBeansCostH5.nextElementSibling;
  let totalPriceOfBeans = yearlyPriceP.innerHTML;
  let justNumYearly = totalPriceOfBeans.slice(1);

  let indCoffeeBagPriceH5 = document.getElementById("coffee-bags-price");
  let indCoffeeBagPriceP = indCoffeeBagPriceH5.nextElementSibling.innerHTML;
  let justNum = indCoffeeBagPriceP.slice(1);
  let increasedRate = 1;

  // dynamically display changes to input ranges ON ROI CALC
  // call alternativeMilkCosts() to show correct calculations on final results section
  function showUserSelections(e) {
    let target = e.target; // selector that event was triggered on
    let h4 = target.previousElementSibling.firstElementChild; // access first element of div (h4)
    let p = h4.nextElementSibling; // nextElementSibling targets p
    if (
      target.id == "espresso-selector" ||
      target.id == "drink-price-selector"
    ) {
      p.innerHTML = "$" + target.value;
    } else {
      p.innerHTML = target.value;
    }
    adjustBeansCostPerYear(justNum);
    checkForAlternativeMilkCosts();
  }

  // check if alternativeMilks option selected
  // if no: run coffeeShop costs with roi-calc selections in place
  // if yes: loop through radio options and find checked one, then pass its id to costOfOatMilks
  // costOfOatMilks then calls showCoffeeShopCosts, with amended milk costs
  function checkForAlternativeMilkCosts() {
    console.log("checking for alt milk costs");
    if (!optionsDisplayed) {
      showCoffeeShopCosts();
    } else {
      let milkOptionsDiv = document.getElementById("three-milks");
      let milks = milkOptionsDiv.getElementsByTagName("input");
      for (let i = 0; i < milks.length; i++) {
        if (milks[i].checked) {
          let milkSelected = milks[i].id;
          calculateCostOfAltMilks(milkSelected);
        }
      }
    }
  }

  function calculateCostOfAltMilks(milk) {
    let oatMilkSurcharge = 1;
    let almondMilkSurcharge = 0.5;
    let soyMilkSurcharge = 0.5;
    let cocoMilkSurcharge = 1;
    if (milk == "oat-milk") {
      increasedRate = 2;
      showCoffeeShopCosts(oatMilkSurcharge);
    } else if (milk == "almond-milk") {
      increasedRate = 1.5;
      showCoffeeShopCosts(almondMilkSurcharge);
    } else if (milk == "soy-milk") {
      increasedRate = 1.5;
      showCoffeeShopCosts(soyMilkSurcharge);
    } else if (milk == "coco-milk") {
      increasedRate = 2;
      showCoffeeShopCosts(cocoMilkSurcharge);
    }
  }

  // calculate results of all ROI calc inputs (and alt milk input if necessary)
  // display coffeeShopCosts in results section
  // call HomeBaristaSavings, to estimate savings given coffee shop expenses
  function showCoffeeShopCosts(altMilk) {
    let totalDrinksDaily = drinkersSelected.value * drinksSelected.value;
    let dailyCost = totalDrinksDaily * priceSelected.value;
    if (altMilk != undefined) {
      for (let i = 0; i < totalDrinksDaily; i++) {
        dailyCost += altMilk;
      }
    }
    let yearlyCost = dailyCost * 356;
    let cpyH5 = document.getElementById("coffee-shop-cpy");
    let cpdH5 = document.getElementById("cost-per-day");
    let cpyP = cpyH5.nextElementSibling;
    let cpdP = cpdH5.nextElementSibling;
    cpyP.innerHTML = "$" + yearlyCost;
    cpdP.innerHTML = "$" + dailyCost;

    showHomeBaristaSavings(totalDrinksDaily, yearlyCost);
  }

  // calculate how much savings compared to coffeeShopCosts
  // also accepts as optional parameter how much MORE (increasedRate) to account for buying alternative milk
  // display results in homeBaristaSavings section + call showSavings func to get annual calculations
  function showHomeBaristaSavings(totalDrinksDaily, coffeeShopYearlyCost) {
    let milkCostPerYear = 90 * totalDrinksDaily;
    milkCostPerYear *= increasedRate;
    console.log("milk cost per year", milkCostPerYear);
    let bagsPerYear = 30 * totalDrinksDaily;
    let bagCost = justNum;
    console.log("bags per year in show home barista", bagsPerYear);
    let totalBagCost = justNumYearly;
    console.log("totalBag cost", totalBagCost);
    let homeBaristaTotalCost =
      parseInt(milkCostPerYear) + parseInt(totalBagCost);
    console.log("homeBarista total cost", homeBaristaTotalCost);
    let homeBaristaH5 = document.getElementById("home-barista-cpy");
    let milkCostH5 = document.getElementById("milk-cost");
    homeBaristaH5.nextElementSibling.innerHTML = "$" + homeBaristaTotalCost;
    coffeeBagsPerYearH5.nextElementSibling.innerHTML = bagsPerYear;
    yearlyBeansCostH5.nextElementSibling.innerHTML = "$" + totalBagCost;
    milkCostH5.nextElementSibling.innerHTML = "$" + milkCostPerYear;

    showYearlySavings(coffeeShopYearlyCost, homeBaristaTotalCost);
  }

  function showYearlySavings(coffeeShopCost, baristaTotalCost) {
    let yearlySavings = coffeeShopCost - baristaTotalCost;
    let fiveYearSavings = yearlySavings * 5;
    let savingsPerYearH5 = document.getElementById("savings-per-year");
    let fiveYearSavingsH5 = document.getElementById("savings-over-x-years");
    savingsPerYearH5.nextElementSibling.innerHTML = "$" + yearlySavings;
    fiveYearSavingsH5.nextElementSibling.innerHTML = "$" + fiveYearSavings;

    calculateMonthsToPayback(yearlySavings);
  }

  function calculateMonthsToPayback(savings) {
    let espressoPackageCost = budgetSelected.value;
    let months = Math.round((espressoPackageCost / savings) * 12);
    let paybackResultH5 = document.getElementById("payback-result");
    paybackResultH5.nextElementSibling.innerHTML = months + " months";
  }

  // when alternative milks checkbox ticked, display all alternative milk options
  let optionsDisplayed = false;

  function displayMilks() {
    let altMilkSelected = document.getElementById("milk-question");
    let checkboxDiv = document.getElementById("roi-milk");

    // if form HASN'T been displayed yet, and checkbox has been checked, create milk options form and append to checkboxDiv
    if (!optionsDisplayed && altMilkSelected.checked) {
      // adjacent to checkbox div, append newDiv
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "three-milks");
      checkboxDiv.insertAdjacentElement("afterend", newDiv);

      // create oat radio option
      let oatLabel = document.createElement("label");
      let oatRadio = document.createElement("input");
      let labelTextOat = document.createTextNode("Oat");
      oatRadio.type = "radio";
      oatRadio.name = "milk-option";
      oatRadio.id = "oat-milk";

      // create almond radio option

      let almondLabel = document.createElement("label");
      let almondRadio = document.createElement("input");
      let labelTextAlmond = document.createTextNode("Almond");
      almondRadio.type = "radio";
      almondRadio.name = "milk-option";
      almondRadio.id = "almond-milk";

      // create coconut radio option
      let cocoLabel = document.createElement("label");
      let cocoRadio = document.createElement("input");
      let labelTextCoco = document.createTextNode("Coconut");
      cocoRadio.type = "radio";
      cocoRadio.name = "milk-option";
      cocoRadio.id = "coco-milk";

      // create soy radio option
      let soyLabel = document.createElement("label");
      let soyRadio = document.createElement("input");
      let labelTextSoy = document.createTextNode("Soy");
      soyRadio.type = "radio";
      soyRadio.name = "milk-option";
      soyRadio.id = "soy-milk";

      // append all radio inputs to the newDiv
      newDiv.appendChild(oatRadio);
      newDiv.appendChild(oatLabel);
      newDiv.appendChild(labelTextOat);
      newDiv.appendChild(almondRadio);
      newDiv.appendChild(almondLabel);
      newDiv.appendChild(labelTextAlmond);
      newDiv.appendChild(cocoRadio);
      newDiv.appendChild(cocoLabel);
      newDiv.appendChild(labelTextCoco);
      newDiv.appendChild(soyRadio);
      newDiv.appendChild(soyLabel);
      newDiv.appendChild(labelTextSoy);
      // note that this func has run
      optionsDisplayed = true;
      addListenerToMilkOptionsDiv();
    } else if (optionsDisplayed && !altMilkSelected.checked) {
      let parent = checkboxDiv.parentNode;
      let childToBeRemoved = parent.childNodes[2];
      childToBeRemoved.remove();
      optionsDisplayed = false;
      increasedRate = 1;
      // call showCoffeeShop costs again, passing no args
      // this is so we can recalculate cost of whole milk
      showCoffeeShopCosts(undefined);
    }
  }

  function addListenerToMilkOptionsDiv() {
    let parent = document.getElementById("three-milks");
    parent.addEventListener("click", function (e) {
      let t = e.target.id;
      if (t == "oat-milk") {
        calculateCostOfAltMilks("oat-milk");
      } else if (t == "almond-milk") {
        calculateCostOfAltMilks("almond-milk");
      } else if (t == "soy-milk") {
        calculateCostOfAltMilks("soy-milk");
      } else if (t == "coco-milk") {
        calculateCostOfAltMilks("coco-milk");
      }
    });
  }

  let customInput = false;

  function createNumberInput(e) {
    let parentDiv = e.target.parentNode;
    if (!customInput) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "priceOfBeans-selector");
      let textBox = document.createElement("input");
      textBox.type = "number";
      textBox.min = "5";
      textBox.max = "50";
      textBox.value = "15";
      newDiv.appendChild(textBox);
      parentDiv.insertAdjacentElement("afterend", newDiv);
      addEventListenerToNumberInput(parentDiv);
      customInput = true;
    } else {
      parentDiv.nextElementSibling.remove();
      customInput = false;
    }
  }

  function addEventListenerToNumberInput(parentDiv) {
    let numberInputDiv = parentDiv.nextElementSibling;
    let numberInput = numberInputDiv.firstElementChild;
    numberInput.addEventListener("click", displayCoffeeBagPrice);
  }

  let customOptionDisplayed = false;

  function displayCoffeeBagPrice(e) {
    customBeansPrice = e.target.value;
    let bagCost = document.getElementById("coffee-bags-price");
    bagCost.nextElementSibling.innerHTML = "$" + customBeansPrice;

    adjustBeansCostPerYear(customBeansPrice);
  }

  function adjustBeansCostPerYear(indBagBeansPrice) {
    justNum = indBagBeansPrice;
    console.log("justNum", justNum);

    let numOfBagsPerYear = drinkersSelected.value * drinksSelected.value * 30;
    console.log("bags bought per year", numOfBagsPerYear);
    let totalPrice = justNum * numOfBagsPerYear;
    console.log("total price", totalPrice);

    let adjustedYearlyBeansCost = yearlyBeansCostH5.nextElementSibling;
    adjustedYearlyBeansCost.innerHTML = "$" + totalPrice;

    justNumYearly = totalPrice;
    totalPriceOfBeans = justNumYearly;
    checkForAlternativeMilkCosts();
  }
}

// increasedRate should be global var
//
containerFunction();

function signUpVisitor() {
  let button = document.getElementById("sign-up-button");
  let clicked = button.addEventListener("click", () =>
    alert(`You're now signed up!`)
  );
}
signUpVisitor();
