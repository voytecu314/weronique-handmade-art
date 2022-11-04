function addToBasket(data) {

    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }

    fetch('http://localhost:5000/basket/add',fetchOptions)
        .then(res=>res.json())
        .then(console.log)
        .catch(console.log);

}