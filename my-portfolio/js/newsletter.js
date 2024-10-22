document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById("myModal");
  const btn = document.getElementById("myBtn");
  const span = document.querySelector(".close");
  const newsletterForm = document.querySelector('.newsletter-form');
  const emailInput = document.querySelector('.nr-input');

  btn.onclick = function() {
      modal.style.display = "block";
  };

  span.onclick = function() {
      modal.style.display = "none";
      resetForm();
  };

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          resetForm();
      }
  };

  newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
          displayMessage("Please enter a valid email address.", "red");
          return;
      }

      subscribeToNewsletter(email);
  });

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  // Subscribe function using Fetch API to send email to backend
  function subscribeToNewsletter(email) {
      // Use Fetch API to send data to the backend
      fetch('http://localhost:3000/subscribe', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              displayMessage(`Thank you for subscribing, ${email}!`, "green");
              emailInput.value = ''; 
              setTimeout(() => {
                  modal.style.display = "none";
                  resetForm();
              }, 3000);
          } else {
              displayMessage("Subscription failed. Please try again.", "red");
          }
      })
      .catch(error => {
          displayMessage("There was an error. Please try again later.", "red");
          console.error('Error:', error);
      });
  }

  function displayMessage(msg, color) {
      let message = document.querySelector(".modal-content .message");

      if (!message) {
          message = document.createElement("p");
          message.classList.add("message");
          newsletterForm.appendChild(message); 
      }

      message.textContent = msg;
      message.style.color = color;
  }

  function resetForm() {
      emailInput.value = '';
      const message = document.querySelector(".modal-content .message");
      if (message) {
          message.remove(); 
      }
  }
});
