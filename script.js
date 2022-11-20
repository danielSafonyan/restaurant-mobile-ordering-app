import menuArray from './data.js'

const userMenuArray = menuArray.map(el => ({...el, inCart: 0}))

document.addEventListener('click', handleClick)

function handleClick(event) {
    const dataset = event.target.dataset;
    if (dataset.addProductid) {
        const addProduct = userMenuArray.find(el => el.id == dataset.addProductid)
        addProduct.inCart++
    }
    if (dataset.subProductid) {
        const subProduct = userMenuArray.find(el => el.id == dataset.subProductid)
        if (subProduct.inCart) {
            subProduct.inCart--
        } else {
            console.log("Cant go below 0.")
            return
        }
        
    }
    renderMenu()
    renderCheckout()
}

function renderCheckout() {
    const itemsInCart = userMenuArray.filter(el => el.inCart > 0)
    renderCartItems(itemsInCart)
    renderTotalPrice(itemsInCart)
}

function renderTotalPrice(itemsInCartArray) {
    const totalPrice = itemsInCartArray.reduce(calcPrice, 0)
    document.getElementById('checkout-total-price').textContent = totalPrice

    function calcPrice(accum, currVal) {
        return accum + currVal.inCart * currVal.price
    }
}

function renderCartItems(itemsInCartArray) {
    let cartItemsHTML = ""
    itemsInCartArray.forEach(el => cartItemsHTML += renderCartItem(el))
    document.getElementById('cart-items').innerHTML = cartItemsHTML
}

function renderCartItem(cartItemObject) {
    const totalItemPrice = cartItemObject.price * cartItemObject.inCart
    return (
        `<div class="cart-item">
            <div class="cart-item-name">${cartItemObject.name}</div>
            <div class="cart-item-quantity">x${cartItemObject.inCart}</div>
            <div class="remove-cart-item" data-remove-cart-itemID=${cartItemObject.id}>remove</div>
            <div class="cart-item-total-price">${totalItemPrice}$</div>
        </div>
        `)
}

function renderMenu() {
    let menuItemsHTML = ""
    userMenuArray.forEach(el => menuItemsHTML += renderMenuItem(el))
    document.getElementById('menu').innerHTML = menuItemsHTML
}

function renderMenuItem(menuItemObject) {
    const subIsDisabled = menuItemObject.inCart === 0
    const subStyle = subIsDisabled ? "disabled" : ""
    return (
        `
            <div class="menu-item">
                <div class="menu-item-image">${menuItemObject.emoji}</div>
                <div class="menu-item-info">
                    <div class="menu-item-info-title">${menuItemObject.name}</div>
                    <div class="menu-item-info-ingredients">
                        ${menuItemObject.ingredients.join(', ')}
                    </div>
                    <div class="menu-item-info-price">$${menuItemObject.price}</div>
                </div>
                <div class="item-quantity">
                    <div class="item-btn ${subStyle}" data-sub-productID=${menuItemObject.id}>-</div>
                    <div class="item-num">${menuItemObject.inCart}</div>
                    <div class="item-btn" data-add-productID=
                    ${menuItemObject.id}>+</div>
                </div>
            </div>
        `
    )
}

renderMenu()


// emoji
// : 
// "🍕"
// id
// : 
// 0
// inCart
// : 
// 0
// ingredients
// : 
// (3) ['pepperoni', 'mushrom', 'mozarella']
// name
// : 
// "Pizza"
// price
// : 
// 14