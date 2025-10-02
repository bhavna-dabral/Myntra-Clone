// Load bag items from localStorage
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
let bagItemObjects = []; // full product details

onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
}

// Map bag item IDs to full product details
function loadBagItemObjects() {
    bagItemObjects = bagItems
        .map(itemId => items.find(product => product.id === itemId))
        .filter(item => item); // filter out undefined
}

// Display bag items
function displayBagItems() {
    const container = document.querySelector('.bag-items-container');
    if (!container) return;

    container.innerHTML = bagItemObjects
        .map((item, index) => generateItemHTML(item, index))
        .join('');
}

// Generate HTML for each item
function generateItemHTML(item, index) {
    return `
    <div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>
        <div class="remove-from-cart" onclick="removeFromBag(${index})">X</div>
    </div>`;
}

// Remove item from bag
function removeFromBag(index) {
    bagItems.splice(index, 1);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
}

// Display bag summary (Total MRP, Discount, Convenience Fee, Total Amount)
function displayBagSummary() {
    const summaryContainer = document.querySelector('.bag-details-container');
    if (!summaryContainer) return;

    let totalMRP = 0;
    let totalDiscount = 0;
    const convenienceFee = 99;

    bagItemObjects.forEach(item => {
        totalMRP += item.original_price;
        totalDiscount += (item.original_price - item.current_price);
    });

    const finalAmount = totalMRP - totalDiscount + convenienceFee;

    summaryContainer.innerHTML = `
        <div class="price-header">PRICE DETAILS (${bagItemObjects.length} Items)</div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs ${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs ${convenienceFee}</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${finalAmount}</span>
        </div>`;
}

// Update Bag icon count
function displayBagIcon() {
    const bagItemElement = document.querySelector('.bag-items');
    if (bagItemElement) {
        bagItemElement.innerText = bagItems.length;
    }
}
