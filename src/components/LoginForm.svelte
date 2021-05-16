<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";
  const userService = getContext("UserService");

  let email = "";
  let password = "";
  let errorMessage = "";
  let inputFieldStyle = "uk-input uk-form-large";

  async function login() {
    let success;

    if (email.length < 5 || password.length < 5) {
      inputFieldStyle = "uk-input uk-form-large uk-form-danger";
    } else {
      inputFieldStyle = "uk-input uk-form-large";
      success = await userService.login(email, password);
    }

    if (success) {
      push("/report");
    } else {
      email = "";
      password = "";
      errorMessage = "Invalid Credentials";
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="uk-margin uk-text-left">
    <label class="uk-form-label" for="form-stacked-text">Email</label>
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: mail" />
      <input
        bind:value={email}
        minlength={5}
        class={inputFieldStyle}
        type="email"
        name="email"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: lock" />
      <input
        bind:value={password}
        class={inputFieldStyle}
        type="password"
        name="password"
        minlength={2}
      />
    </div>
  </div>
  <div class="uk-margin">
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1"
      >Login</button
    >
  </div>
  {#if errorMessage}
    <div class="uk-text-left uk-text-small">
      {errorMessage}
    </div>
  {/if}
</form>
