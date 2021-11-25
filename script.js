const items = [
    { name: 'tomato', amount: 0, price: 1.49 },
    { name: 'lettuce', amount: 0, price: 1.99 },
    { name: 'onion', amount: 0, price: 2.49 },
    { name: 'cheese', amount: 0, price: 2.99 },
    { name: 'meat', amount: 0, price: 10.79 }
];

const pricePara = document.getElementById('price');
const addButtons = document.getElementsByClassName('add-btn');
const rmvButtons = document.getElementsByClassName('rmv-btn');
const totalAmountElement = document.getElementById('total-amount');
let totalPrice = 0.99, totalAmount = 0;
const MAX_TOTAL_AMOUNT = 15;

function addItem(itemIndex) {
    totalAmount++;
    updateTotalAmount();
    let itemName = items[itemIndex].name;
    items[itemIndex].amount++;
    let element = document.createElement('div');
    element.className = itemName;
    element.innerHTML = `<img src="images/${itemName}.png" class="burger-icon">`;
    document.getElementById(`${itemName}-container`).appendChild(element);
    updatePrice(items[itemIndex].price);
    updateAmount(itemName, items[itemIndex].amount);
    document.getElementById(`remove-${itemName}-btn`).disabled = false;

    if (totalAmount === MAX_TOTAL_AMOUNT) {
        toggleDisabledAddBtns(true);
    }
}

function removeItem(itemIndex) {
    if (totalAmount === MAX_TOTAL_AMOUNT) {
        toggleDisabledAddBtns(false);
    }
    let itemName = items[itemIndex].name;
    totalAmount--;
    updateTotalAmount();
    items[itemIndex].amount--;
    let elements = document.getElementsByClassName(itemName);
    elements[elements.length - 1].remove();

    updatePrice(-items[itemIndex].price);
    updateAmount(itemName, items[itemIndex].amount);

    if (items[itemIndex].amount === 0) {
        document.getElementById(`remove-${itemName}-btn`).disabled = true;
    }
}

function updateTotalAmount() {
    totalAmountElement.innerHTML = `total amount: ${totalAmount}/${MAX_TOTAL_AMOUNT}`;
}

function updatePrice(price) {
    totalPrice += price;
    pricePara.innerHTML = `Current Price: ${totalPrice.toFixed(2)}$`;
}

function updateAmount(itemName, amount) {
    document.getElementById(`${itemName}-amount`).innerHTML = amount;
}

function toggleDisabledAddBtns(flag) {
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].disabled = flag;
    }
}

function toggleDisabledRmvBtns(flag) {
    for (let i = 0; i < rmvButtons.length; i++) {
        rmvButtons[i].disabled = flag;
    }
}

function resetAmount() {
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        while (items[itemIndex].amount > 0) {
            removeItem(itemIndex);
        }
    }

    // toggleDisabledRmvBtns(true); // disable all remove buttons

}

