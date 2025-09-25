function ShowHelloMessage() {
    var name = document.getElementById("myname");
    document.getElementById("hellomessage").innerHTML = "Hello, " + name.value;
}

//document.getElementById("mybutton").onclick = ShowHelloMessage;

let parsedData = [];
const fileUrl = '/Database/Data.csv'

Papa.parse(fileUrl, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        parsedData = results.data;
        console.log("CSV loaded.");
        console.log("Parsed Data:", parsedData.map(p => p.name));

        const params = new URLSearchParams(window.location.search);
        const productName = params.get("product");

        if (productName) {
            displayProduct(productName);
        } else {
            console.warn("No product specified in URL.");
        }
    },
    error: function(err) {
        console.error("Error loading CSV:", err);
    }
});

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', function() {
    const query = searchBar.value.toLowerCase();

    searchResults.textContent = "";

    if (!query) {
        searchResults.textContent = "Please enter a search term";
        return;
    }

    const filterdResults = parsedData.filter(item => {
        for (const key in item) {
            const value = String(item[key]).toLowerCase();
            if (value.includes(query)) {
                return true;
            }
        }
    });

if (filterdResults.length > 0) {
    searchResults.innerHTML = ""; // Clear previous results

    filterdResults.forEach(product => {
        const div = document.createElement('div');
        div.textContent = `${product.name} - $${product.price}`;
        div.style.cursor = "pointer";
        div.style.padding = "8px";
        div.style.borderBottom = "1px solid #ccc";

        // When clicked, show that product in the product details area
        div.onclick = () => {
            window.location.href = `/Subpages/PRODUCTPAGE.html?product=${encodeURIComponent(product.name)}`;
        };

        searchResults.appendChild(div);
    });
} else {
    searchResults.textContent = "No matching results found.";
}
});


function displayProduct(productName) {
    console.log("Searching for product:", productName);
    
    // Match ignoring case and trim whitespace
    const product = parsedData.find(p => p.name?.trim().toLowerCase() === productName.trim().toLowerCase());
    console.log("Matched product:", product);

    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productType').textContent = product.type;
        document.getElementById('productCondition').textContent = product.condition;
    } else {
        console.error("Product not found:", productName);
        document.getElementById("ProductError").textContent = "Product not found.";
    }
}