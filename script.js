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
    let restAmountNeedet = 0;


    for (let i = 0; i < prices.length; i++) {
        subTotal += prices[i] * amounts[i];
    }

    if (subTotal == 0) {
        document.getElementById('deliveryCost').style.display = 'none';
        document.getElementById('emptyCard').style.display = 'flex';
        Array.from(document.getElementById('costs').children).forEach(child => child.style.color = '#9F9F9F');
        finalSum = subTotal;
        document.getElementById('amountNeedet').style.display = 'none';
    } else {
        document.getElementById('deliveryCost').style.display = 'flex';
        document.getElementById('emptyCard').style.display = 'none';
        document.getElementById('amountNeedet').style.display = 'block';
        Array.from(document.getElementById('costs').children).forEach(child => child.style.color = 'black');
        finalSum = subTotal + deliveryCosts;
        restAmountNeedet = 10 - subTotal;
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
    

    if (subTotal <= 10) {
        let amountNeedet= document.getElementById('amountNeedet');
        amountNeedet.innerHTML = /*html*/ `
            <div class="between" style="color: black">
                <div>Betrag der benötigt wird um den Mindestbestellwert zu erreichen.</div>
                <div>${restAmountNeedet.toFixed(2).replace('.', ',')}€</div>
            </div>
            <div class="line"></div>
        `;
        document.getElementById('minimumOrderAmount').style.display = 'flex';
        document.getElementById('readeToOrderButton').style.background = '#D0D0D0';
    } else {
        document.getElementById('minimumOrderAmount').style.display = 'none';
        amountNeedet.innerHTML = /*html*/ `
            <div>Sie haben den Mindestbestellwert von 10,00 € erreicht.</div>
        `;
        document.getElementById('readeToOrderButton').style.background = 'blue';
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