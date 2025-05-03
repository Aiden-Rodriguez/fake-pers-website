const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const descP = document.createElement('p');
    descP.textContent = product.description;

    const priceP = document.createElement('p');
    priceP.className = 'price';
    priceP.textContent = `$${product.price}`;

    const buttonDiv = document.createElement('div');
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Add to cart';
    buyButton.addEventListener('click', () => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    });
    buttonDiv.appendChild(buyButton);

    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(descP);
    detailsDiv.appendChild(priceP);
    detailsDiv.appendChild(buttonDiv);

    article.appendChild(img);
    article.appendChild(detailsDiv);

    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const productList = document.querySelector('.product-list');
    if (!productList) return;

    productList.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = 'Search results';
    productList.appendChild(heading);

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const productCard = renderProductCard(product);
            productList.appendChild(productCard);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) {
        console.error('Cart items container not found');
        return;
    }

    cartItems.innerHTML = '';
    console.log('Cleared cart-items content');

    let itemCount = 0;
    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const itemP = document.createElement('p');
            itemP.textContent = `${product.name} x${product.numInCart}`;
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                product.numInCart = 0;
                rerenderAllProducts();
                rerenderCart();
            });

            cartItems.appendChild(itemP);
            cartItems.appendChild(removeButton);
            itemCount++;
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    const minPrice = minPriceInput.value ? Number.parseFloat(minPriceInput.value) : 0;
    const maxPrice = maxPriceInput.value ? Number.parseFloat(maxPriceInput.value) : Infinity;

    return product.price >= minPrice && product.price <= maxPrice;
}

minPriceInput.addEventListener('change', () => {
    console.log(`Min price changed to: ${minPriceInput.value}`);
    rerenderAllProducts();
});
maxPriceInput.addEventListener('change', () => {
    console.log(`Max price changed to: ${maxPriceInput.value}`);
    rerenderAllProducts();
});
rerenderAllProducts();
rerenderCart();

