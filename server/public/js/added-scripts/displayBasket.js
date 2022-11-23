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
    totalPrice: `<div class="mt-5">
        <p>Total: <span id="total-price">0€</span></p>
        <p>Total price after discount: <span id="total-price-after-discount" style="color: lightgreen">0€</span></p>
    </div>`
}

function displayBasket(x) {
    
    if(checkJWT(x)?.user_auth){

        const sessionBasket = sessionStorage.getItem('W-H-A-Session-Basket');

        if(sessionBasket && JSON.parse(sessionBasket).length!=0){

            basketModalBody.innerHTML = basket_elements.table + basket_elements.totalPrice;

            const fetchOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: sessionBasket
            }

            fetch('http://localhost:5000/basket/get-session-basket',fetchOptions)
            .then(res=>res.json())
            .then(({sessionBasket})=>{

                const calculateBasketPrice = (sessionBasket) => document.getElementById('total-price').innerText=`${sessionBasket.reduce((sum,item)=>sum+item.price,0).toFixed(2)}€`;
                const calculateTotalDiscount = (sessionBasket) => document.getElementById('total-price-after-discount').innerText=`${sessionBasket.reduce((sum,item)=>{
                    const itemDiscountPrice = item.discount.set?(item.price-item.price*(item.discount.percent/100)):item.price;
                    return sum+itemDiscountPrice},0).toFixed(2)}€`;

                const basketTable = document.getElementById('basket-table');
                sessionBasket.map((item,i)=>basketTable.insertAdjacentHTML('beforeend',
                    `<tr>
                        <td>${item.name} - ${item.title}</td>
                        <td  class="text-right">${item.price}€</td>
                        <td  class="text-right">${item.discount.set?item.discount.percent:0}%</td>
                        <td  class="text-center">
                            <a href='#' id="${item._id}" onclick="(()=>{const sessionBasket = JSON.parse(sessionStorage.getItem('W-H-A-Session-Basket')).filter(id=>id!=this.id); sessionStorage.setItem('W-H-A-Session-Basket',JSON.stringify(sessionBasket));this.parentElement.parentElement.remove(); displayBasket(this) })(this)">
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

        console.log('logged');
    }
}