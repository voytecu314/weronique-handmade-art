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
                const basketTable = document.getElementById('basket-table');
                sessionBasket.map(item=>basketTable.insertAdjacentHTML('beforeend',
                    `<tr>
                        <td>${item.name} - ${item.title}</td>
                        <td>${item.price}€</td>
                        <td>${item.discount.set?item.discount.percent:0}%</td>
                        <td>
                            <a href='#' id="${item._id}" onclick="(()=>{sessionStorage.setItem('W-H-A-Session-Basket',JSON.stringify(JSON.parse(sessionStorage.getItem('W-H-A-Session-Basket')).filter(id=>id!=this.id)));this.parentElement.parentElement.remove()})(this)">
                                <i class="fa fa-close"></i>
                            </a></td>
                    </tr>`));
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