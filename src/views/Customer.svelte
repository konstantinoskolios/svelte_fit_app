<script>
  import "../css/user.css";
  import "../css/logout.css";
  import "../css/custom-navbar.css";
  import "../css/custom-footer.css";
  import "../css/custom-alert.css";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  let showModal = false;
  import { showAlert } from "./viewutility.js";
  import { construct_svelte_component } from "svelte/internal";

  const params = new URLSearchParams(window.location.search);
  let type = params.get("type");
  let name = params.get("name");
  let user_id = params.get("user_id");

  let counter = 2;
  let fields = [{ id: 1, food: "", quantity: "" }];
  let showForm = false;
  let showFormCard = false;

  const addField = () => {
    counter++;
    fields = [...fields, { id: counter, food: "", quantity: "" }];
  };

  const removeField = (id) => {
    fields = fields.filter((field) => field.id !== id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      steps: event.target.steps.value,
      date: event.target.date.value,
      user_id: user_id,
      foods: fields.map((field) => field.food),
      quantity: fields.map((field) => field.quantity),
    };

    fetch("http://localhost:3000/daily_track_customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const caloriesTarget = 3000;
        const totalCalories = data.totalCalories;
        if (totalCalories < 0) {
          showAlert("Please enter valid data", "red");
        } else {
          const remainingCalories = caloriesTarget - totalCalories;
          if (remainingCalories < 0) {
            showAlert(
              `Your calories is above  your target by : ${
                -1 * remainingCalories
              }`,
              "red"
            );
          } else {
            showAlert(
              `Remaining total calories: ${remainingCalories}`,
              "green"
            );
          }
        }
        // handle successful response from server
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle error
      });
  };

  function handleSubmitCard(event) {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);
    const cardInfo = {
      credit_card_id: formData.get("credit_card_id"),
      date_added: formData.get("date_added"),
      cvv: formData.get("cvv"),
      type: formData.get("type"),
      expiration_date: formData.get("expiration_date"),
      user_id: user_id,
    };

    fetch("http://localhost:3000/add_new_card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.detail !== "undefined") {
          showAlert(`Error: ${data.detail}.`, "red");
        } else {
          showAlert(
            `Card Added Successfully! Waiting for approval by an admin.`,
            "green"
          );
        }
      })
      .catch((error) => {
        showAlert(`Ops something went wrong.. reason : ${error}`, "red");
      });
  }

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
</script>

{#if showModal}
  <div class="modal">
    <div class="modal-message">Are you sure you want to log out?</div>
    <div class="modal-buttons">
      <button on:click={confirmLogout}>Log out</button>
      <button on:click={cancelLogout}>Cancel</button>
    </div>
  </div>
{/if}

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

<div class="user-title">
  <h1>Welcome {type}: <span style="color: orange">{name}</span></h1>
</div>

<div>
  <button on:click={() => (showForm = !showForm)}>
    {#if showForm}
      Hide Form
    {:else}
      Add Tracks
    {/if}
  </button>

  <button on:click={() => (showFormCard = !showFormCard)}>
    {#if showFormCard}
      Hide Form
    {:else}
      Add Card
    {/if}
  </button>

  <button style="background-color:red" on:click={logout}>Log out</button>
</div>

<div>
  <div>
    {#if showForm}
      <form on:submit={handleSubmit}>
        <div class="header">
          <h2>Add a Track</h2>
          <p>
            Fill out the form below to track your food intake and daily
            activity, and achieve your goals more effectively.
          </p>
        </div>

        {#each fields as field}
          <div style="margin-right:0px" class="form-group">
            <label for="food-{field.id}">Food:</label>
            <input
              type="text"
              id="food-{field.id}"
              name="foods[]"
              bind:value={field.food}
              required
            />
            <label for="quantity-{field.id}">Quantity (Grams):</label>
            <input
              type="number"
              id="quantity-{field.id}"
              name="quantity[]"
              bind:value={field.quantity}
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

        <div class="form-group">
          <label for="steps">Number of steps walked:</label>
          <input type="number" id="steps" name="steps" required />
        </div>

        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div>
          <button type="button" on:click={addField}>Add Field</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    {/if}
  </div>

  <div>
    {#if showFormCard}
      <form on:submit={handleSubmitCard}>
        <div class="header">
          <h2>Add a New Card</h2>
          <p>
            Please fill out the form below to add a new credit card to your
            account.
          </p>
        </div>

        <div class="form-group">
          <label for="credit_card_id">Credit Card ID:</label>
          <input
            type="text"
            id="credit_card_id"
            name="credit_card_id"
            required
            maxlength="16"
          />
        </div>

        <div class="form-group">
          <label for="date_added">Date Added:</label>
          <input type="date" id="date_added" name="date_added" required />
        </div>

        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required maxlength="3" />
        </div>

        <div class="form-group">
          <label for="type">Type:</label>
          <select id="type" name="type" required>
            <option value="">-- Select card type --</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="expiration_date">Expiration Date:</label>
          <input
            type="month"
            id="expiration_date"
            name="expiration_date"
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
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
