<script>
  import { navigate } from "svelte-routing";
  import "../css/login.css";
  import "../css/custom-footer.css";
  import { showAlert } from "./viewutility";

  let email = "";
  let password = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();
      console.log(data)
      console.log(data.user_type)
      if (data.user_type === "Admin") {
        navigate(`/admin?type=${data.user_type}&name=${data.name}`);
      } else if (data.user_type === "Customer") {
        navigate(`/customer?type=${data.user_type}&name=${data.name}&user_id=${data.user_id}`);
      } else if (data.user_type === "Personal Trainer") {
        navigate(`/personaltrainer?type=${data.user_type}&name=${data.name}`);
      } else {
        showAlert("Something went wrong.",'red');
      }
    } catch (error) {
      showAlert("User Not Found",'red');
    }
  };
</script>

<div class="login-container">
  <h1 class="login-header">Welcome to <strong style="color:#4caf50">MYFITAPP</strong></h1>
  <p class="login-text">
    Log in below to access your fitness goals and progress.
  </p>
  <form on:submit={handleSubmit}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <div>
      <button class="btn-green btn-hover" type="submit">Log In</button>
      <button class="btn-coral btn-hover" on:click={() => navigate("/signup")}
        >Sign Up</button
      >
    </div>
    <div>
      <a href="/forgot-password">
        <em>Forgot Password</em>
      </a>
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
