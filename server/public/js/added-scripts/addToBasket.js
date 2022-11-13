function addToBasket(item) {
    if(checkJWT(item)?.user_auth){

      let sessionBasket = [item.id]; 

      if(sessionStorage.getItem('W-H-A-Session-Basket')) {
        sessionBasket = JSON.parse(sessionStorage.getItem('W-H-A-Session-Basket'));

        if(!sessionBasket.includes(item.id))
        document.body.insertAdjacentHTML('beforeend',infoModal('Item added to no-login session basket!'));
        
        !sessionBasket.includes(item.id) && sessionBasket.push(item.id);console.log(sessionBasket);
      }  
      
      sessionStorage.setItem('W-H-A-Session-Basket',JSON.stringify(sessionBasket));

      if(sessionBasket.length===1)
      document.body.insertAdjacentHTML('beforeend',infoModal('Item added to no-login session basket!'));
    } else {
        
        const fetchOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                    token: localStorage.getItem('W-H-A-JWT-Token')},
                    body: JSON.stringify(item)
                }
    

        fetch('http://localhost:5000/basket/add-item',fetchOptions)
            .then(res=>res.json())
            .then(msg=>{msg.error?
                        document.body.insertAdjacentHTML('beforeend',infoModal(msg.error+' Please reload the page or login again')):
                        document.body.insertAdjacentHTML('beforeend',infoModal(msg));
                      console.log(msg);})
            .catch(console.log);
    }

}