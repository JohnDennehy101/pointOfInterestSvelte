<script>
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
    navBarIconDisplay,
  } from "../stores";
  import MonumentList from "../components/MonumentList.svelte";
  import { getContext, onMount } from "svelte";
  import OffCanvasNav from "../components/OffCanvasNav.svelte";
  let userJsonWebToken;
  let monuments;
  let provinceCategories;
  let otherCategories;
  let userService = getContext("UserService");
  let monumentService = getContext("MonumentService");
  title.set("Monuments");
  subTitle.set("Monuments added to date");
  navBarIconDisplay.set("display:block");

  let setLocalStorageMonumentId = (id) => {
    localStorage.monument = JSON.stringify(id);
  };

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

<OffCanvasNav />

<div
  class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
  uk-grid
>
  <div class="uk-width-expand@m">
    <h1 class="uk-heading">Monuments Added To Date</h1>
    <div class="uk-divider-icon" />
    <MonumentList />
  </div>
</div>
