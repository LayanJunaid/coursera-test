// Fetch existing products from the back-end API
function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('products');
            productList.innerHTML = '';  // Clear the product list
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Add a new product
function addProduct(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;

    const newProduct = {
        name: productName,
        description: productDescription
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            fetchProducts();  // Refresh the product list after adding
            document.getElementById('product-form').reset();  // Reset form
        } else {
            console.error('Failed to add product');
        }
    })
    .catch(error => console.error('Error adding product:', error));
}

// Set up event listeners
document.getElementById('product-form').addEventListener('submit', addProduct);

// Load products when the page loads
window.onload = fetchProducts;
