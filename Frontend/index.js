 const formDOM = document.getElementById("form");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const errorBox = document.querySelector(".error");
      formDOM.addEventListener("submit", async (e) => {
      

        e.preventDefault();
        if (!emailInput.checkValidity()) {
         
          document.querySelector(".email-error").innerHTML =
            '<p class="error-p" style="color:red ">Invalid email address.</p>';
          setTimeout(function () {
            document.querySelector(".email-error").innerHTML = ""; 
          }, 4000);
          return;
        }

        
        if (passwordInput.value.length < 8) {
          document.querySelector(".password-error").innerHTML =
            '<p class="error-p" style="color:red ">Password must be at least 8 characters long.</p>';
          setTimeout(function () {
            document.querySelector(".password-error").innerHTML = ""; 
          }, 4000);
          return;
        }
        const email = emailInput.value;
        const password = passwordInput.value;

        try {
          const response = await axios.post("/auth/register", {
            email,
            password,
          });

          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);

            window.location.href = "todoApp.html";
          }
        } catch (error) {
          console.log(error);
          errorBox.innerHTML =
            '<p class="error-p">The User Already exists try to log in</p>';
          errorBox.style.textAlign = "center";
          setTimeout(function () {
            errorBox.innerHTML = ""; 
          }, 4000);
        }
        
      });