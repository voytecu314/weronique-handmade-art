const basketModalBody = document.getElementById('basket-modal-body');
const basket_elements = {
    table: `<table id="basket-table" style="width:100%">
        <tr>
        <th>Product: </th>
        <th>Price</th>
        <th>Discount</th>
        <th>Remove</th>
        </tr>
    </table>`,
    totalPrice: `<div class="mt-5 d-flex justify-content-between">
        <div>
            <p>Total: <span id="total-price">0€</span></p>
            <p>Total price after discount: <span id="total-price-after-discount" style="color: lightgreen">0€</span></p>
        </div>
        <a href="#" class="fa fa-paypal" title="PayPal checkout" data-toggle="modal" data-target="#PayPalForm" data-dismiss="modal"></a>
        </div>`
}

const removeItem = (el) => {
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            token: localStorage.getItem('W-H-A-JWT-Token')
        },
        body: JSON.stringify({item_id: el.id})
    }

    fetch('https://weronique.onrender.com/basket/remove-item',fetchOptions)
    .then(res=>res.json())
    .then(({newBasket})=>{
        
        document.getElementById('total-price').innerText = 
        (newBasket.reduce((sum,{item_value})=>sum+item_value*100,0))/100;

        document.getElementById('total-price-after-discount').innerText = 
        (newBasket.reduce((sum,{item_value_after_discount})=>sum+item_value_after_discount*100,0))/100;

        const purchaseReady = newBasket.map(({item_id})=>item_id);
        sessionStorage.setItem('purchaseReady', JSON.stringify(purchaseReady));

       
    })
    .catch(err=>console.log('Removing item from DB basket failed!', err.message));

    el.parentElement.parentElement.remove();
}

function displayBasket(x) {

    basketModalBody.innerHTML = basket_elements.table + basket_elements.totalPrice;
    
    if(checkJWT(x)?.user_auth){

        const sessionBasket = sessionStorage.getItem('W-H-A-Session-Basket');
        sessionStorage.setItem('purchaseReady',sessionBasket);

        if(sessionBasket && JSON.parse(sessionBasket).length!=0){

            const fetchOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: sessionBasket
            }

            fetch('https://weronique.onrender.com/basket/get-session-basket',fetchOptions)
            .then(res=>res.json())
            .then(({sessionBasket})=>{

                const calculateBasketPrice = (sessionBasket) => document.getElementById('total-price').innerText=`${sessionBasket.reduce((sum,item)=>sum+item.price,0).toFixed(2)}€`;
                const calculateTotalDiscount = (sessionBasket) => document.getElementById('total-price-after-discount').innerText=
                `${sessionBasket.reduce((sum,item)=>{
                    const itemDiscountPrice = item.discount.set?(item.price-item.price*(item.discount.percent/100)):item.price;
                    return sum+itemDiscountPrice},0).toFixed(2)}€`;

                const basketTable = document.getElementById('basket-table');
                sessionBasket.map(item=>basketTable.insertAdjacentHTML('beforeend',
                    `<tr>
                        <td>${item.name} - ${item.title}</td>
                        <td  class="text-right">${item.price}€</td>
                        <td  class="text-right">${item.discount.set?item.discount.percent:0}%</td>
                        <td  class="text-center">
                            <a href='#' id="${item._id}" onclick="(()=>{const sessionBasket = JSON.parse(sessionStorage.getItem('W-H-A-Session-Basket')).filter(id=>id!=this.id); sessionStorage.setItem('W-H-A-Session-Basket',JSON.stringify(sessionBasket)); sessionStorage.setItem('purchaseReady',JSON.stringify(sessionBasket));this.parentElement.parentElement.remove(); displayBasket(this) })(this)">
                                <i class="fa fa-close"></i>
                            </a></td>
                    </tr>`));
                
                    calculateBasketPrice(sessionBasket);
                    calculateTotalDiscount(sessionBasket);
                })
            .catch(err=>console.log('Session basket fetch error',err.message));

        }
        
        else if(!sessionBasket || JSON.parse(sessionBasket).length==0) {

             basketModalBody.innerHTML = 'Basket is empty';
        
            }
    } else {

        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                token: localStorage.getItem('W-H-A-JWT-Token')
            }
        }

        fetch('https://weronique.onrender.com/basket/get-user-basket',fetchOptions)
        .then(res=>res.json()).then(userBasket=>{
            const purchaseReady = [];
            const basketTable = document.getElementById('basket-table');
            userBasket.map(({item_id, item_name, item_style, item_value, discount})=>{
                purchaseReady.push(item_id);
                basketTable.insertAdjacentHTML('beforeend',
                `<tr>
                    <td>${item_name} - ${item_style}</td>
                    <td  class="text-right">${item_value}€</td>
                    <td  class="text-right">${discount}%</td>
                    <td  class="text-center">
                        <a href='#' id="${item_id}" onclick="removeItem(this)">
                            <i class="fa fa-close"></i>
                        </a></td>
                </tr>`);
                });
            
                sessionStorage.setItem('purchaseReady',JSON.stringify(purchaseReady));

                document.getElementById('total-price').innerText = 
                (userBasket.reduce((sum,{item_value})=>sum+item_value*100,0))
                /100;

                document.getElementById('total-price-after-discount').innerText = 
                (userBasket.reduce((sum,{item_value_after_discount})=>sum+item_value_after_discount*100,0))
                /100;
            }) 
        .catch(err=>console.log('User basket fetch error',err.message));

    }
}