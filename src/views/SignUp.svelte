<!-- Signup.svelte -->
<script>
  import "../css/signup.css";
  import { navigate } from "svelte-routing";
  let email = "";
  let password = "";
  let name = "";
  let user_type = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          user_type,
        }),
      });

      console.log(response);

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/");
      } else {
        console.log("User registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearAll = () => {
    email = "";
    password = "";
    name = "";
    user_type = "";
  };

  const goBack =() =>{
    navigate("/")
  }
</script>

<div class="join-container">
  <h1 class="join-heading">
    Join to unlock your true <span class="pretty-text">potential</span>!
  </h1>
</div>

<div class="space-up-mid">
  <form on:submit={handleSubmit}>
    <!-- <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required /> -->

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required />

    <label for="user_type">Type:</label>
    <select id="user_type" bind:value={user_type} required>
      <option value="Customer">Customer</option>
      <option value="Personal Trainer">Personal Trainer</option>
    </select>

    <div class="button-group">
      <button class="btn-green btn-hover" type="submit">Confirm</button>
      <button class="btn-coral btn-hover" style="background-color:red" on:click={clearAll}>Clear</button>
      <button class="btn-coral btn-hover" style="background-color:black" on:click={goBack}>Go Back</button>
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
