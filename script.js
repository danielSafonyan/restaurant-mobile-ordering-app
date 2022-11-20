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
}

function renderMenu() {
    let menuItemsHTML = ""
    userMenuArray.forEach(el => menuItemsHTML += renderMenuItem(el))
    document.getElementById('menu').innerHTML = menuItemsHTML
}

function renderMenuItem(itemObject) {
    const subIsDisabled = itemObject.inCart === 0
    const subStyle = subIsDisabled ? "disabled" : ""
    return (
        `
            <div class="menu-item">
                <div class="menu-item-image">${itemObject.emoji}</div>
                <div class="menu-item-info">
                    <div class="menu-item-info-title">${itemObject.name}</div>
                    <div class="menu-item-info-ingredients">
                        ${itemObject.ingredients.join(', ')}
                    </div>
                    <div class="menu-item-info-price">$${itemObject.price}</div>
                </div>
                <div class="item-quantity">
                    <div class="item-btn ${subStyle}" data-sub-productID=${itemObject.id}>-</div>
                    <div class="item-num">${itemObject.inCart}</div>
                    <div class="item-btn" data-add-productID=
                    ${itemObject.id}>+</div>
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