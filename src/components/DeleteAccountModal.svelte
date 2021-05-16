<script>
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  let userJwt;
  const userService = getContext("UserService");

  onMount(async function () {
    userJwt = JSON.parse(localStorage.user);
  });

  let deleteUser = async function () {
    let success = await userService.deleteUser(userJwt);
    await userService.logout();

    if (success) {
      document.getElementById("delete-account-modal").style.display = "none";
      push("/");
    } else {
      //   errorMessage = "Invalid Credentials";
    }
  };
</script>

<div id="delete-account-modal" uk-modal>
  <div class="uk-modal-dialog">
    <button class="uk-modal-close-default" type="button" uk-close />
    <div class="uk-modal-header">
      <h2 class="uk-modal-title">Delete Account</h2>
    </div>
    <div class="uk-modal-body">
      <p>Are you sure that you want to delete your account?</p>
    </div>
    <div class="uk-modal-footer uk-text-right">
      <button class="uk-button uk-button-default uk-modal-close" type="button"
        >Cancel</button
      >
      <!-- <form action="/deleteAccount/{{user._id}}" method="POST" style="display:inline"> -->
      <button
        on:click={deleteUser}
        class="uk-button uk-button-danger"
        type="submit"
        formmethod="post"
        id="confirmationDeleteAccountButton">Delete</button
      >
      <!-- </form> -->
    </div>
  </div>
</div>
