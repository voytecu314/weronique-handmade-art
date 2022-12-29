function checkJWT (item=undefined) {
    
    if(localStorage.getItem('W-H-A-JWT-Token')) {

        const fetchAuthOptions = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                token: localStorage.getItem('W-H-A-JWT-Token')
            }
        }
    
        fetch('https://weronique.onrender.com/user-login/is-logged', fetchAuthOptions)
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error);
                localStorage.removeItem('W-H-A-JWT-Token');
                checkJWT();location.reload();
                throw new Error('JWT token error - new login might be necessary');
            } else if(!item){
                document.getElementById('greet').innerText=`Hello  ${data.name} !`;
                document.getElementById('info').innerText=`Enjoy discounts on every product!`;
                document.getElementById('login-button').innerText='LOGOUT';
                document.getElementById('login-button').removeAttribute('data-toggle');
                document.getElementById('login-button').removeAttribute('data-target');
                document.getElementById('login-button').addEventListener('click', ()=>{
                    localStorage.removeItem('W-H-A-JWT-Token');
                    location.reload();
                })
                document.getElementById('special-4-u').innerText='Special for You:';
                document.getElementById('newest').innerText='Newest products:';
                document.getElementById('newest-description').innerHTML=`<a onclick="searchModal('newest')" style="box-shadow: 0px 1px grey"> Get newest products  </a>`;
                document.getElementById('upcoming').innerText='UPCOMING EVENT:';
                
                fetchEvent().then(event=>document.getElementById('event-link').innerHTML=`
                <p title="${event.description}"><strong>${event.place}:</strong> ${event.title}</br>
                <strong>${event.date.slice(0,16)}</strong> </br>
                <a href="${event.link}" target="_blank">Link to event.</a></p>
                `);
            } 
            
            
        })
        .catch(err=>console.log('fetch onload auth error',err.message));
    
    } 
    
    else return {user_auth: {is: false}} ;

}