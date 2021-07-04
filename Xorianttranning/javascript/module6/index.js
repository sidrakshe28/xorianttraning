var crrncy = {'EUR': {'PLN': 4.15, 'USD': 0.83}, 'USD': {'PLN': 3.45, 'EUR': 1.2}}
var btn = document.querySelector('.calculate-btn');
var baseCurrencyInput = document.getElementById('currency-1');
var secondCurrencyInput = document.getElementById('currency-2');
var amountInput = document.getElementById('amount');
var toShowAmount = document.querySelector('.given-amount');
var toShowBase = document.querySelector('.base-currency');
var toShowSecond = document.querySelector('.second-currency');
var toShowResult = document.querySelector('.final-result');

function convertCurrency(event) {
  event.preventDefault();
  var amount = amountInput.value;
  var from = baseCurrencyInput.value;
  var to = secondCurrencyInput.value;
  var result = 0;
  
  try{
    if (from == to){
      result = amount;
    } else {
     result = amount * crrncy[from][to];
  }
  }
  catch(err) {
    result = amount * (1 / crrncy[to][from]);
  }
  
  toShowAmount.innerHTML = amount;
  toShowBase.textContent = from + ' = ';
  toShowSecond.textContent = to;
  toShowResult.textContent = result; 
}

btn.addEventListener('click', convertCurrency);

