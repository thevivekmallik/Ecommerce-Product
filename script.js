async function fetchProducts() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    card.appendChild(image);

    if (product.badge_text) {
        const badge = document.createElement('div');
        badge.classList.add('badge');
        badge.textContent = product.badge_text;
        card.appendChild(badge);
    }

    const titleAndVendorContainer = document.createElement('div');
    titleAndVendorContainer.classList.add('title-and-vendor-container');

    const title = document.createElement('h3');
    title.textContent = product.title;
    //card.appendChild(title);
    title.style.display = 'inline-block';
    title.style.marginRight = '20px';



    const vendor = document.createElement('p');
    vendor.textContent = `● ${product.vendor}`;
    vendor.outerHTML 
    //card.appendChild(vendor);
    vendor.style.display = 'inline-block';

    titleAndVendorContainer.appendChild(title);
    titleAndVendorContainer.appendChild(vendor);
    card.appendChild(titleAndVendorContainer);



    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    const price = document.createElement('p');
    price.textContent = `Rs ${product.price}`;
    //card.appendChild(price);
    price.style.display = 'inline-block';
    price.style.marginRight = '10px';

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `Compare at Price: $${product.compare_at_price}`;
    comparePrice.innerHTML = `<del>${product.compare_at_price}</del>`;
    //card.appendChild(comparePrice);
    comparePrice.style.display = 'inline-block';
    comparePrice.style.marginRight = '10px';
    comparePrice.style.color = 'grey';
    //card.appendChild(priceContainer);

    const discount = document.createElement('p');
    const discountValue = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
    discount.textContent = `${discountValue.toFixed(2)}% Off`;
    //card.appendChild(discount);
    discount.style.color = 'red';
    discount.style.display = 'inline-block';

    priceContainer.appendChild(price);
    priceContainer.appendChild(comparePrice);
    priceContainer.appendChild(discount);
    card.appendChild(priceContainer);
    //discount.style.display = 'inline-block';
    

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.textContent = 'Add to Cart';
    card.appendChild(addToCartBtn);

    return card;
}

async function showProducts(category) {
    const categories = await fetchProducts();
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    categories.forEach(cat => {
        if (cat.category_name === category) {
            cat.category_products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        }
    });
}

// Show initial products (default: Men)
showProducts('Men');