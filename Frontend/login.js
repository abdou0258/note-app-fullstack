const formDOM = document.getElementById("form");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const errorBox = document.querySelector(".error");

      document.addEventListener("DOMContentLoaded", function () {
        
        formDOM.addEventListener("submit", async (e) => {
          e.preventDefault();

          if (!emailInput.checkValidity()) {
            
            document.querySelector(".email-error").innerHTML =
              '<p class="error-p" style="color:red ">Invalid email address.</p>';
            setTimeout(function () {
              document.querySelector(".email-error").innerHTML = ""; // Clear the error message
            }, 4000);
            return;
          } 

          // Validate password
          if (passwordInput.value.length < 8) {
            document.querySelector(".password-error").innerHTML =
              '<p class="error-p" style="color:red ">Password must be at least 8 characters long.</p>';
            setTimeout(function () {
              document.querySelector(".password-error").innerHTML = ""; // Clear the error message
            }, 4000);
            return;
          }
          const email = emailInput.value;
          const password = passwordInput.value;

          try {
            const response = await axios.post("/auth/login", {
              email,
              password,
            });

            // Assuming the server sends a token in the response
            const token = response.data.token;

            if (token) {
              localStorage.setItem("token", token);

              window.location.href = "todoApp.html";
            }
          } catch (error) {
            console.log(error);
            errorBox.innerHTML =
              '<p class="error-p">This user isnt availabale try to register</p>';
            errorBox.style.textAlign = "center";
            setTimeout(function () {
              errorBox.innerHTML = ""; // Clear the error message
            }, 4000);
          }
        });
      });