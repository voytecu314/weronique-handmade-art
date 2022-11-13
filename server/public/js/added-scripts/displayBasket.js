function displayBasket(x) {
    if(checkJWT(x)?.user_auth){

        
        console.log('not logged');
    } else {
        
        console.log('logged');
    }
}