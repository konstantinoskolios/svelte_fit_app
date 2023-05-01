<script>
  import "../css/custom-footer.css";
  import "../css/custom-navbar.css";
  import "../css/contact.css";
  import { showAlert } from "./viewutility";

  let name = "";
  let email = "";
  let message = "";

  const dummyMessage = (event) => {
    event.preventDefault(); // prevents the default form submission behavior
    showAlert("Your message has been sent successfully, thank you!!",'y');
    console.log(event)
  };
</script>

<!-- Navigation Bar -->
<nav class="c-nav">
  <div class="logo">
    <a href="/">MYFITAPP</a>
  </div>
  <ul class="menu">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/customplans">Custom Plans</a></li>
    <li><a href="/dailytips">Daily Tips</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<header>MINIMALISTIC FORM</header>

<form id="form" class="topBefore" on:submit={dummyMessage}>
  <input
    id="name"
    name="name"
    type="text"
    placeholder="NAME"
    required
    bind:value={name}
  />
  <input
    id="email"
    name="email"
    type="email"
    placeholder="E-MAIL"
    required
    bind:value={email}
  />
  <textarea
    id="message"
    name="message"
    placeholder="MESSAGE"
    required
    bind:value={message}
  />
  <input id="submit" type="submit" value="GO!" />
</form>

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
