let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
onLoad();

function onLoad() {
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    const bagItemElement = document.querySelector('.bag-item-count');
    if (!bagItemElement) return;

    if (bagItems.length > 0) {
        bagItemElement.style.visibility = 'visible';
        bagItemElement.innerText = bagItems.length;
    } else {
        bagItemElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    const container = document.querySelector('.items-container');
    if (!container) return;

    container.innerHTML = items.map(item => `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="${item.item_name}">
            <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
        </div>
    `).join('');
}
