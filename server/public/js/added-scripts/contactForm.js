const contactForm = document.getElementById('contact-form');

        contactForm.addEventListener('submit', function (event){ 
            event.preventDefault();

            fetch('https://weronique.onrender.com/email-js')
                        .then(res=>res.json())
                        .then(({pKey, serviceID, templateID})=>{ 
                             emailjs.sendForm(serviceID,templateID, contactForm, pKey)
                                .then(function(response) {
                                console.log('Contact status',response.status);
                                }, function(error) {
                                console.log('Sending Contact-Form FAILED...', error);
                                });
                            contactForm.reset();
                         })
                        .catch(err=>console.log('Fetch email credentials failed', err.message));

           
        });