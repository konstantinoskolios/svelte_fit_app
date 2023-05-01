<!-- App.svelte -->
<script>
  import { Router, Route, Link } from "svelte-routing";
  import Login from "./views/Login.svelte";
  import Customer from "./views/Customer.svelte";
  import Admin from "./views/Admin.svelte";
  import PersonalTrainer from "./views/PersonalTrainer.svelte";
  import SignUp from "./views/SignUp.svelte";
  import About from "./views/About.svelte";
  import Contact from "./views/Contact.svelte";
  import ForgotPassword from "./views/ForgotPassword.svelte";
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/" component={Login} />
    <Route path="/customer" component={Customer} />
    <Route path="/admin" component={Admin} />
    <Route path="/personaltrainer" component={PersonalTrainer} />
    <Route path="/signup" component={SignUp} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/forgot-password" component={ForgotPassword} />
  </div>
</Router>
