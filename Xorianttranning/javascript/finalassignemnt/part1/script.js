let products = [
    {
        id: 1,
        name: 'Product A',
        rate: 77.5,
        photo: 'https://images.unsplash.com/photo-1586295470933-7cca2e0e3fa0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb3R3ZWFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    },
    {
        id: 2,
        name: 'Product B',
        rate: 42,
        photo: 'https://images.unsplash.com/photo-1580906853149-f82f7601d205?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb3R3ZWFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    },
    {
        id: 3,
        name: 'Product C',
        rate: 3.30,
        photo: 'https://images.unsplash.com/photo-1595461135849-bf08893fdc2c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vdHdlYXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    },
    {
        id: 4,
        name: 'Product D',
        rate: 105,
        photo: 'https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdHdlYXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
    }
];

products.forEach((item, i) => {
    $('main .container').append(`
        <div class="card">
            <img src="${item.photo}" alt="${item.name}"/>
            <section>
                <span>${item.name}</span>
                <span>&#x20b5;${item.rate.toFixed(2)}</span>
            </section>
            <button type="button" class="btnAdToCart" onclick="addToCart(${item.id});">&plus;</button>
        </div>
    `);
});

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const getIndex = id => cart.indexOf(cart.find(item => item.id === id));

const popCart = () => {
    // console.log(cart);
    if(cart.length > 0){
        $("main .callout").html(`
            <div class="row">
        `);
        cart.forEach((item, i) => {
            $("main .callout .row").append(`
                <div class="card">
                    <img src="${products[item.id - 1].photo}" alt="${products[item.id - 1].name}"/>
                    <section>
                        <span>${products[item.id - 1].name}</span>
                        <span>${item.qty}</span>
                        <span>&#x20b5;${products[item.id - 1].rate.toFixed(2)}</span>
                    </section>
                    <section>
                        &#x20b5;${(item.qty*products[item.id - 1].rate).toFixed(2)}
                    </section>
                    <button type="button" class="btnRemoveCartItem" onclick="removeCartItem(${item.id});">&times;</button>
                </div>
            `);
        });
        $("main .callout").append(`
            </div>
            <div class="row">
                <section>
                    <div class="">
                        <small>Sub Total:</small>
                        <apan class="billAmt">&#x20b5;${(cart.reduce((accu, item, i) => accu += item.qty*products[i].rate, 0)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="">
                        <small>Total Bill:</small>
                        <apan class="billAmt">&#x20b5;${(cart.reduce((accu, item, i) => accu += item.qty*products[i].rate, 0)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </section>
                <section>
                    <button type="button" class="btnReset" onclick="resetCart();">Clear</button>
                    <button type="button" class="btnCheckOut" onclick="checkOut();">Checkout</button>
                </section>
            </div>
        `);
    }
    else{
        $("main .callout").html(`
            <div class="alert">
                <p>Ooopppsss.....</p>
                <p>You have no items in cart!</p>
            </div>
        `);
    }
    cart.reduce((accu, item) => accu += item.qty, 0) < 1 ? $("header nav .cartCount").find("sup").css('background', 'gray').text(cart.reduce((accu, item) => accu += item.qty, 0)) : $("header nav .cartCount sup").css('background', 'green').text(cart.reduce((accu, item) => accu += item.qty, 0));
    $("main .callout .row:last-child section:first-child span#billAmt").html(`&#x20b5;${cart.reduce((accu, item) => accu += (item.qty*item.rate), 0)}`);
}
popCart();

const addToCart = id => {
    if(cart.length > 0){
        getIndex(id) > -1 ? cart[getIndex(id)].qty += 1 : cart.push({id, qty: 1});
    }
    else{
        cart.push({id, qty: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    popCart();
}

const removeCartItem = id => {
    getIndex(id) > -1 ? cart.splice(getIndex(id), 1) : '';
    localStorage.setItem('cart', JSON.stringify(cart));
    popCart();
}

const resetCart = () => {
    if(confirm("Empty cart?")){
        cart.splice(0, cart.length);
        localStorage.setItem('cart', JSON.stringify(cart));
        popCart();
    }
}

const checkOut = () => {
    return;
}