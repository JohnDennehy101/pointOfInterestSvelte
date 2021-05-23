<script>
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
  } from "../stores";
  import MonumentList from "../components/MonumentList.svelte";
  import { getContext, onMount } from "svelte";
  let userJsonWebToken;
  let userService = getContext("UserService");
  title.set("Monuments");
  subTitle.set("Monuments added to date");

  onMount(async function () {
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

<div
  class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
  uk-grid
>
  <div class="uk-width-expand@m">
    <MonumentList />
  </div>
</div>
