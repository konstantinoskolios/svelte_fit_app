<script>
  import "../css/user.css";
  import "../css/logout.css";
  import "./viewutility";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { showAlert } from "./viewutility";

  let showModal = false;
  let userId = null;
  let userData = null;
  let cardsData = [];

  const params = new URLSearchParams(window.location.search);
  let type = params.get("type");
  let name = params.get("name");

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!userId) {
      showAlert("Please enter a user ID",'red');
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) {
      showAlert("User not found",'red');
      return;
    }

    const response2 = await fetch(`http://localhost:3000/cards/${userId}`);
    if (!response.ok) {
      showAlert("User not found",'red');
      return;
    }

    userData = await response.json();
    cardsData = await response2.json();
    console.log(cardsData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      showAlert("Please search for a user before submitting changes",'red');
      return;
    }

    const response = await fetch(
      `http://localhost:3000/users/${userData.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const response2 = await fetch(
      `http://localhost:3000/updateCardStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardsData),
      }
    );

    if (!response.ok || !response2.ok) {
      showAlert("Error updating user data",'red');
      return;
    }

    showAlert("User data updated successfully",'green');
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

<div class="user-title">
  <h1>Welcome {type}: <span style="color: orange">{name}</span></h1>
</div>

<div>
  <form on:submit={handleSearch}>
    <div class="form-group">
      <label for="userId">User ID:</label>
      <input type="number" id="userId" bind:value={userId} required />
      <button type="submit">Search</button>
    </div>
  </form>

  {#if userData}
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={userData.name} required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={userData.email} required />
      </div>

      <div class="form-group">
        <label for="userType">User Type:</label>
        <input
          type="text"
          id="userType"
          bind:value={userData.user_type}
          required
        />
      </div>

      {#if cardsData.length > 0}
      {#each cardsData as card }
        <div class="form-group">
          <label for="validation_status">Card: <strong style="color:red">{card.credit_card_ids}</strong></label>
          <input
            type="text"
            id="validation_status"
            bind:value={card.validation_status}
            required
          />
        </div>
      {/each}
    {/if}

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  {/if}

  <button style="background-color:red" on:click={logout}>Log out</button>
</div>
