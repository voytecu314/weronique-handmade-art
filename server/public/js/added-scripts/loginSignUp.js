const confirmPassInput = `<input id="confirm-password" value="Testtesttesttest1" type="password" class="form-control" name="confirm_password" placeholder="Confirm password" required>`;
const userNameInput = '<input id="user-name" type="text" class="form-control" name="user_name" placeholder="User Name" required>';

let signUp = false;
let userName = null;
let confirmPass = null;
const loginForm = document.getElementById('login-form');
const loginTitle = document.getElementById('login-title');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formInputs = {};
    for(let x=0; x<e.target.children.length; x++){
        if(e.target.children[x].tagName==='INPUT') {
            formInputs[e.target.children[x].name]=e.target.children[x].value
        }
    }

    fetchOpt = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formInputs)
    };
    
    if (signUp) {
        if(confirmPass && confirmPass.value === confirmPass.previousElementSibling.value)
            fetchLoginData('sign-up',fetchOpt);
        else alert('Password and confirmed password must match!');
    } else {
        fetchLoginData('login',fetchOpt);
    }
    document.getElementById('membershipForm').style.display='none';
    setTimeout(()=>location.reload(),5000);
});

function showSignUpForm(paraBtn) {

    if(!signUp){
        loginForm.insertAdjacentHTML("afterbegin", userNameInput);
        loginForm.lastElementChild.insertAdjacentHTML("beforebegin", confirmPassInput);
        loginTitle.innerText = 'SignUp';
        paraBtn.innerHTML='Back to <a href="#">Login</a>';
        userName = document.getElementById("user-name");
        confirmPass = document.getElementById("confirm-password");
    } else {
        userName && userName.remove();
        confirmPass && confirmPass.remove();
        userName = null;
        confirmPass = null;
        loginTitle.innerText = 'Login';
        paraBtn.innerHTML='No account? - <a href="#">Sign Up</a>';
    }
    signUp=!signUp
}

function fetchLoginData(prefix, fetchOpt) {
    fetch(`http://localhost:5000/user-login/${prefix}`, fetchOpt)
                .then(res=>res.json())
                .then(answer=>{document.body.innerHTML+=infoModal(answer.msg);

                                answer.data && answer.activation_email && 
                                emailjs.send(answer.activation_email.serviceID,
                                    answer.activation_email.templateID, 
                                    {name: answer.data.name,
                                    email: answer.data.email,
                                    activation_id: answer.data.activation_id},
                                    answer.activation_email.pKey)
                                .then(function(response) {
                                console.log('Activation email status',response.status);
                                }, function(error) {
                                console.log('Sending activation email FAILED...', error);
                                });
                            
                                answer.token && localStorage.setItem('W-H-A-JWT-Token',answer.token);
                                
                            })
                .catch(err=>console.log('SignUp/Login fetch error:',err.message));
}
