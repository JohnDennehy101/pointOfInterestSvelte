<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";
  const userService = getContext("UserService");

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let userType = "";
  const numberOfRecords = 0;
  let errorMessage = "";

  async function signUp() {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userType: userType,
      numberOfRecords: numberOfRecords,
    };
    console.log(newUser);
    let success = await userService.signUp(newUser);
    console.log(success);
    if (success) {
      push("/report");
    } else {
      email = "";
      password = "";
      errorMessage = "Error Creating New Account";
    }
  }
</script>

<form on:submit|preventDefault={signUp}>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: user" />
      <input
        bind:value={firstName}
        class="uk-input uk-form-large"
        type="text"
        name="firstName"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: user" />
      <input
        bind:value={lastName}
        class="uk-input uk-form-large"
        type="text"
        name="lastName"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: mail" />
      <input
        bind:value={email}
        class="uk-input uk-form-large"
        type="text"
        name="email"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: lock" />
      <input
        bind:value={password}
        class="uk-input uk-form-large"
        type="password"
        name="password"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <select
        bind:value={userType}
        class="uk-select uk-form-large"
        name="userType"
      >
        <option value="" disabled selected>Select User Type</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  </div>

  <div class="uk-margin">
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1"
      >Sign up</button
    >
  </div>

  {#if errorMessage}
    <div class="uk-text-left uk-text-small">
      {errorMessage}
    </div>
  {/if}
</form>
