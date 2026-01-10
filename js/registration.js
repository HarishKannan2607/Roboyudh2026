// Razorpay Checkout script MUST be loaded in HTML
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

function submitRequest(e) {
  e.preventDefault();

  const messageBox = document.querySelector('.message');
  messageBox.textContent = "";
  messageBox.style.color = "#333";

  // Collect form values
  const data = {
    fullName: document.querySelector('.name').value,
    teamSize: document.querySelector('.teamsize').value,
    email: document.querySelector('.email').value,
    collegeName: document.querySelector('.collegename').value,
    teamName: document.querySelector('.teamname').value,
    phoneNumber: document.querySelector('.phonenumber').value,
    event: document.querySelector('.event').value
  };

  // 1️⃣ CREATE ORDER (BACKEND)
  fetch("https://roboyudh-backend-production.up.railway.app/roboyudh26/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
   body: JSON.stringify({
  teamSize: Number(data.teamSize),
  event: data.event
})

  })
    .then(res => {
      if (!res.ok) throw new Error("Order creation failed");
      return res.json();
    })
    .then(order => {

      // 2️⃣ OPEN RAZORPAY PAYMENT
      const options = {
        key: "rzp_live_RwD5mUdOzlVP0N", // 🔑 YOUR RAZORPAY KEY ID
        amount: order.amount,
        currency: "INR",
        name: "ROBOYUDH 2026",
        description: "Event Registration",
        order_id: order.id,

        handler: function (response) {

          // 3️⃣ VERIFY PAYMENT & SAVE REGISTRATION
          fetch("https://roboyudh-backend-production.up.railway.app/roboyudh26/verify-and-save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              payment: response,
              registration: data
            })
          })
            .then(async res => {
              const text = await res.text();

              if (res.ok) {
                messageBox.textContent = "Registration Successful 🎉";
                messageBox.style.color = "green";
                document.querySelector(".register-form").reset();
              } else {
                messageBox.textContent = text || "Payment verification failed";
                messageBox.style.color = "red";
              }
            })
            .catch(() => {
              messageBox.textContent = "Server error while saving data";
              messageBox.style.color = "red";
            });
        },

        modal: {
          ondismiss: function () {
            messageBox.textContent = "Payment cancelled by user";
            messageBox.style.color = "orange";
          }
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    })
    .catch(() => {
      messageBox.textContent = "Unable to initiate payment. Try again.";
      messageBox.style.color = "red";
    });
}

// Attach submit listener
document
  .querySelector(".register-form")
  .addEventListener("submit", submitRequest);
