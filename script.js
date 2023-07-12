async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let I = 0; I < includeElements.length; I++) {
        const element = includeElements[I];
        file = element.getAttribute('w3-include-html');   // „includes/header.html“*
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


let names = [];
let prices = [];
let amounts = [];

let subTotal = 0;
let finalSum = 0;
let deliveryCosts = 2.50;


function addToBasket(name, price) {

    if (names.includes(name)) {
        let index = names.indexOf(name);
        amounts[index]++;
    } else {
        names.push(name);
        prices.push(price);
        amounts.push (1);
    }

    renderBasket();
}


function renderBasket() {
    let subTotal = 0;
    let finalSum = 0;


    for (let i = 0; i < prices.length; i++) {
        subTotal += prices[i] * amounts[i];
    }

    if (subTotal == 0) {
        document.getElementById('deliveryCost').style.display = 'none';
        finalSum = subTotal;
    } else {
        document.getElementById('deliveryCost').style.display = 'flex';
        finalSum = subTotal + deliveryCosts;
    }

    document.getElementById('subtotal').innerHTML = subTotal.toFixed(2).replace('.', ',');
    document.getElementById('deliveryCostAmount').innerHTML = deliveryCosts.toFixed(2).replace('.', ',');
    document.getElementById('finalSum').innerHTML = finalSum.toFixed(2).replace('.', ',');

    let container = document.getElementById('basketContainer');
        container.innerHTML = ``;

    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let price = prices[i] * amounts[i];
        let amount = amounts[i];    

        container.innerHTML += /*html*/ `
        <div class="filled-basket">
            <div class="between-amount-and-button">
                <div>
                    ${amount}x ${name}
                </div>    
                <div style="display: flex;">
                    <button class="plus-minus-button" onclick="addMoreFood(${i})">+</button> 
                    <button class="plus-minus-button" onclick="deleteSingleFood(${i})">-</button>
                </div>
            </div>
            <div class="price-and-delete">
                <div>
                    ${price.toFixed(2).replace('.', ',')} €
                </div>
                <div>
                    <img onclick="deleteAllFood(${i})" src="/img/mülleimer.svg">
                </div>
            </div>
        </div>`;
    }
}


function deleteAllFood(i) {
    names.splice(i, 1);
    prices.splice(i, 1);
    amounts.splice(i, 1);
    renderBasket();
}


function addMoreFood(i) {
    amounts[i]++;
    renderBasket();
}


function deleteSingleFood(i) {
    if (amounts[i] == 1) {
        deleteAllFood(i);
    } else {
        amounts[i]--;
        renderBasket();
    }
}