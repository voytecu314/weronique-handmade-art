paypal
        .Buttons({
            style: {
                color:  'white'
              },
          // Sets up the transaction when a payment button is clicked
          createOrder: function (data, actions) {
            return fetch("http://localhost:5000/paypal/api/orders", {
              method: "post",
              headers:{
                'Content-Type':'application/json',
                token: localStorage.getItem('W-H-A-JWT-Token')
              },
              body: sessionStorage.getItem('purchaseReady')
            })
              .then((response) => response.json())
              .then((order) => order.id)
              .catch(err=>console.log('On create order error',err));
          },
          // Finalize the transaction after payer approval
          onApprove: function (data, actions) {
            return fetch(`http://localhost:5000/paypal/api/orders/${data.orderID}/capture`, {
              method: "post",
            })
              .then((response) => response.json())
              .then((orderData) => {
                // Successful capture! Send log to DB:
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                
                document.getElementById('paypal-button-container').innerHTML = '<h3>Thank you for your payment!</h3>';
                
              }).catch(err=>console.log('On aprove error',err));
          },
        })
        .render("#paypal-button-container");