<!-- Signup.svelte -->
<script>
  import "../css/custom-footer.css";
  import { navigate } from "svelte-routing";
  import { showAlert } from "./viewutility";
  let email = "";
  let user_type = "";
  let retrievePassword = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/getPasswordByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user_type }),
      });

      const data = await response.json();
      retrievePassword = data.password;

      if (response.ok) {
        showAlert("Password sent successfully!", "green");
      } else {
        showAlert(`Error: ${await response.text()}`, "red");
      }
    } catch (error) {
      console.log("Error:", error);
      showAlert("Error sending password. Please try again later.", "red");
    }
  };

  const clearAll = () => {
    email = "";
    user_type = "";
    retrievePassword = "";
  };

  const goBack = () => {
    navigate("/");
  };
</script>

<div class="space-up-mid">
  <form on:submit={handleSubmit}>
    <h1>Forgot Password Dashboard</h1>

    <div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>

      <div>
        <label for="user_type">Type:</label>
        <select id="user_type" bind:value={user_type} required>
          <option value="Customer">Customer</option>
          <option value="Personal Trainer">Personal Trainer</option>
        </select>
      </div>

      {#if retrievePassword !== ""}
        <div>
          <label for="password">Password:</label>
          <input
            type="text"
            id="password"
            bind:value={retrievePassword}
            required
          />
        </div>
      {/if}
    </div>

    <div class="button-group">
      <button class="btn-green btn-hover" type="submit">Confirm</button>
      <button class="btn-coral btn-hover" on:click={clearAll}>Clear</button>
      <button
        class="btn-coral btn-hover"
        style="background-color:black"
        on:click={goBack}>Go Back</button
      >
    </div>
  </form>
</div>


<!-- Footer -->
<div>
  <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
  <footer class="custom-footer">
    <div class="footer-bottom">
      <div class="social-icons">
        <ul>
          <li><a href="/">Twitter</a></li>
          <li><a href="mailto:konstantinoskolios@windowslive.com">Email</a></li>
          <li><a href="https://github.com/SylvanasGr">Github</a></li>
          <li><a href="/">MYFITAPP</a></li>
        </ul>
      </div>

      <p>
        Designed and developed by <a href="https://github.com/SylvanasGr"
          >Konstantinos Kolios</a
        >
      </p>
      <p>&copy; 2023 All rights reserved.</p>
    </div>
  </footer>
</div>
