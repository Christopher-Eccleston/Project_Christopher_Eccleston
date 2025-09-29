    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }

    function ready() {
        var removeCartButtons = document.getElementsByClassName('btn-danger');
        console.log(removeCartButtons);
        for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
        }

        var quantityOfInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityOfInputs.length; i++) {
            var input = quantityOfInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('addToCart')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

        document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkoutClicked)

        loadCartItems();
        displayCartItems();
        updateCartTotal();
    }

    function checkoutClicked() {
        alert('Thank you for your purchase')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        localStorage.removeItem('cartItems');
        updateCartTotal()
    }

    function removeCartItem(event) {
        var buttonClicked = event.target;
        var cartRow = buttonClicked.parentElement.parentElement;
        var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;

        // Remove the item from the DOM
        cartRow.remove();

        // Get the current cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Filter out the item with the matching title
        cartItems = cartItems.filter(item => item.title !== title);

        // Save the updated array back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart total
        updateCartTotal();
    }

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('productName')[0].innerText
        var price = shopItem.getElementsByClassName('productPrice')[0].innerText
        var type = shopItem.getElementsByClassName('productType')[0].innerText
        console.log(title, price, type)
        addItemToCart(title, price, type)
        updateCartTotal()
    }

    function addItemToCart(title, price, type) {
        // Get existing cart items from localStorage or if none exist, create an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the item already exists in the cart
        const itemExists = cartItems.some(item => item.title === title);
        if (itemExists) {
            console.log('Item already in cart:', title);
            return; // Exit the function if the item is already in the cart
        }

        // Create a new item object
        const newItem = { title, price, type };

        // Add the new item to the cart items array
        cartItems.push(newItem);

        // Save the updated array back to localStorage as a JSON string
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        console.log('Item added to cart:', newItem);

        console.log(cartItems);
        console.log(cartItems.length);
    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows =cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i <cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
            console.log(total)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    }

    function loadCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Loaded cart items:', cartItems);
    }

    function displayCartItems() {
        var itemsInCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        itemsInCart.forEach(item => {
            console.log('Displaying item:', item);
            addItemToCartDisplay(item.title, item.price, item.type);
        });
    }

    function addItemToCartDisplay(title, price, type) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already in the cart')
                return
            }
        }
        var cartRowContents = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">${title}</span>
                <span class="cart-item-type">${type}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">Remove</button>
            </div>`
                cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }

    console.log("Cart.js loaded");