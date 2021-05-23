<script>
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
    navBarIconDisplay,
  } from "../stores";
  import UserAccountForm from "../components/UserAccountForm.svelte";
  import DeleteAccountModal from "../components/DeleteAccountModal.svelte";
  import { onMount, getContext } from "svelte";
  import OffCanvasNav from "../components/OffCanvasNav.svelte";
  title.set("Settings");
  subTitle.set("Edit Account Details");
  navBarIconDisplay.set("display:block");
  let userJsonWebToken;
  const userService = getContext("UserService");

  onMount(async () => {
    userJsonWebToken = JSON.parse(localStorage.user);
    let success = await userService.getIndividualUser(userJsonWebToken);

    if (success) {
      if (success.userType === "Admin") {
        navBar.set({
          bar: loggedInAdminUserBar,
        });
      } else {
        navBar.set({
          bar: loggedInUserBar,
        });
      }
    }
  });
</script>

<OffCanvasNav />
<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
    uk-grid
  >
    <div class="uk-width-auto@m">
      <img
        width="500"
        src="/settingsImage.jpg"
        alt="Religious Sculpture on front of church"
      />
    </div>
    <div class="uk-width-expand@m">
      <div
        class="uk-card uk-card-default uk-width-xlarge uk-card-body uk-box-shadow-large"
      >
        <h3 class="uk-card-title uk-text-center">Your Details:</h3>

        <UserAccountForm signUpAction={false} />
      </div>
    </div>
  </div>
  <DeleteAccountModal />
</div>
