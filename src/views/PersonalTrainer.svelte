<script>
  import "../css/user.css";
  import "../css/logout.css";
  import "../css/custom-footer.css";
  import "../css/custom-navbar.css";
  import "../css/custom-alert.css";
  import { showAlert } from "./viewutility.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  let showModal = false;
  let userId = null;

  const params = new URLSearchParams(window.location.search);
  let type = params.get("type");
  let name = params.get("name");

  let counter = 2;
  let fields = [{ id: 1, exercise: "", sets: "", reps: "" }];
  let showForm = false;
  let userData = null;
  let user_name = null;

  let calories_avg = 0;
  let steps_avg = 0;
  let total_days_count = 0;

  const addField = () => {
    counter++;
    fields = [...fields, { id: counter, exercise: "", sets: "", reps: "" }];
  };

  const removeField = (id) => {
    fields = fields.filter((field) => field.id !== id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData) {
      showAlert("Please search for a user before submitting changes", "red");
      return;
    } else {
      showAlert(
        `The plan has created successfully for Customer: ${user_name}`,
        "green"
      );
    }
  };

  const logout = () => {
    showModal = true;
  };

  const confirmLogout = () => {
    // perform logout action
    navigate("/");
  };

  const cancelLogout = () => {
    showModal = false;
  };

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        cancelLogout();
      }
    });
  });

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!userId) {
      showAlert("Please enter a user ID", "red");
      return;
    }

    const response = await fetch(`http://localhost:3000/customers/${userId}`);
    if (!response.ok) {
      showAlert("User not found", "red");
      return;
    }

    const response2 = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) {
      showAlert("User not found", "red");
      return;
    }

    user_name = await response2.json();
    user_name = user_name.name;
    userData = await response.json();
    let count = 0;
    userData.forEach((c) => {
      calories_avg = c.total_calories;
      steps_avg = c.total_steps;
      count++;
    });

    calories_avg = Math.floor((calories_avg / count) * 100) / 100;
    steps_avg = Math.floor((steps_avg / count) * 100) / 100;
    total_days_count = count;
  };

  const clearAll = () => {
    userData = "";
    user_name = "";
    userId = "";
    showForm = false;
  };
</script>

<nav class="c-nav">
  <div class="logo">
    <a href="/">MYFITAPP</a>
  </div>
  <ul class="menu">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/">Available Users</a></li>
    <li><a href="/">Daily Tips</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

{#if showModal}
  <div class="modal">
    <div class="modal-message">Are you sure you want to log out?</div>
    <div class="modal-buttons">
      <button on:click={confirmLogout}>Log out</button>
      <button on:click={cancelLogout}>Cancel</button>
    </div>
  </div>
{/if}

<div class="user-title">
  <h1>Welcome {type}: <span style="color: orange">{name}</span></h1>
</div>

<div>
  <button on:click={() => (showForm = !showForm)}>
    {#if showForm}
      Hide Form
    {:else}
      Show Form
    {/if}
  </button>

  <button style="background-color:red" on:click={logout}>Log out</button>
</div>

<div>
  <form on:submit={handleSearch}>
    <div class="form-group">
      <label for="userId">User ID:</label>
      <input type="number" id="userId" bind:value={userId} required />
      <button type="submit">Search</button>
      <button type="button" style="background-color:red" on:click={clearAll}
        >Clear All</button
      >
    </div>
  </form>

  {#if userData}
    <form>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={user_name} required />
      </div>

      <div class="form-group">
        <label for="calories_avg">Calories Avg:</label>
        <input
          type="text"
          id="calories_avg"
          bind:value={calories_avg}
          required
        />
      </div>

      <div class="form-group">
        <label for="steps_avg">Steps Avg:</label>
        <input type="text" id="steps_avg" bind:value={steps_avg} required />
      </div>

      <div class="form-group">
        <label for="total_days">Total Days:</label>
        <input
          type="text"
          id="total_days"
          bind:value={total_days_count}
          required
        />
      </div>
    </form>
  {/if}

  <div>
    {#if showForm}
      <form on:submit={handleSubmit}>
        {#each fields as field}
          <div style="margin-right:0px" class="form-group">
            <label for="exercise-{field.id}">Exercise:</label>
            <input
              type="text"
              id="exercise-{field.id}"
              name="exercises[]"
              bind:value={field.exercise}
              required
            />
            <label for="sets-{field.id}">Sets:</label>
            <input
              type="number"
              id="sets-{field.id}"
              name="sets[]"
              bind:value={field.sets}
              required
            />
            <label for="reps-{field.id}">Reps:</label>
            <input
              type="number"
              id="reps-{field.id}"
              name="reps[]"
              bind:value={field.reps}
              required
            />
            {#if field.id > 1}
              <button
                class="mini-button-cancel"
                type="button"
                on:click={() => removeField(field.id)}>Remove</button
              >
            {/if}
          </div>
        {/each}

        <div>
          <button type="button" on:click={addField}>Add Field</button>
          <button type="submit">Submit</button>
          <button style="background:red" type="button" on:click={clearAll}
            >Clear</button
          >
        </div>
      </form>
    {/if}
  </div>
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
