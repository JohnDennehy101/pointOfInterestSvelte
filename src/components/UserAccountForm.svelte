<script>
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  const userService = getContext("UserService");

  export let signUpAction;

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let userType = "";
  const numberOfRecords = 0;
  let errorMessage = "";
  let userJsonWebToken;
  let userId;
  let callToActionButtonTitle;
  let inputFieldStyle = "uk-input uk-form-large";
  let selectFieldStyle = "uk-select uk-form-large";

  onMount(async function () {
    if (!signUpAction) {
      callToActionButtonTitle = "Edit User";
      userJsonWebToken = JSON.parse(localStorage.user);
      let success = await userService.getIndividualUser(userJsonWebToken);
      console.log(success);
      if (success) {
        firstName = success.firstName;
        lastName = success.lastName;
        email = success.email;
        // password = success.password;
        userType = success.userType;
        userId = success._id;
      }
    } else if (signUpAction) {
      callToActionButtonTitle = "Sign Up";
    }
  });

  const addUserFunction = async function signUp() {
    let newUser, success;
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 5 &&
      password.length > 5 &&
      userType.length > 3
    ) {
      newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType,
        numberOfRecords: numberOfRecords,
      };
    }

    console.log(newUser);

    if (newUser) {
      success = await userService.signUp(newUser);
    }
    if (success) {
      push("/report");
    } else {
      inputFieldStyle = "uk-input uk-form-large uk-form-danger";
      selectFieldStyle = "uk-select uk-form-large uk-form-danger";
      email = "";
      password = "";
      errorMessage = "Error Creating New Account";
    }
  };

  const editUserFunction = async function editUser() {
    let editedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userType: userType,
      numberOfRecords: numberOfRecords,
      _id: userId,
    };

    let success = await userService.editUser(editedUser);
    if (success) {
      push("/report");
    } else {
      inputFieldStyle = "uk-input uk-form-large uk-form-danger";
      selectFieldStyle = "uk-select uk-form-large uk-form-danger";
      errorMessage = "Error Editing Account";
    }
  };

  let actionUser;

  if (signUpAction) {
    actionUser = addUserFunction;
  } else {
    actionUser = editUserFunction;
  }
</script>

<form on:submit|preventDefault={actionUser}>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: user" />
      <input
        bind:value={firstName}
        class={inputFieldStyle}
        type="text"
        minlength={1}
        name="firstName"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: user" />
      <input
        bind:value={lastName}
        class={inputFieldStyle}
        minlength={1}
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
        class={inputFieldStyle}
        type="email"
        minlength={5}
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
        minlength={5}
        type="password"
        name="password"
      />
    </div>
  </div>
  <div class="uk-margin">
    <div class="uk-inline uk-width-1-1">
      <select bind:value={userType} class={selectFieldStyle} name="userType">
        <option value="" disabled selected>Select User Type</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  </div>

  <div class="uk-margin">
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1"
      >{callToActionButtonTitle}</button
    >
  </div>

  {#if errorMessage}
    <div class="uk-text-left uk-text-small">
      {errorMessage}
    </div>
  {/if}
</form>

{#if !signUpAction}
  <div class="uk-margin uk-align-left">
    <button
      type="button"
      id="deleteAccountButton"
      class="uk-button uk-button-danger"
      href="#delete-account-modal"
      uk-toggle>DELETE ACCOUNT</button
    >
  </div>
{/if}
