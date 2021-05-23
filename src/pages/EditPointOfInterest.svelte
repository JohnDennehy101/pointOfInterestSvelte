<script>
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
  } from "../stores";
  import { onMount, getContext } from "svelte";
  import PointOfInterestForm from "../components/PointOfInterestForm.svelte";
  import EditPointOfInterestImage from "../components/EditPointOfInterestImage.svelte";

  title.set("Point of Interest");
  subTitle.set("Edit Point of Interest");

  // navBar.set({
  //   bar: loggedInUserBar,
  // });
  const userService = getContext("UserService");
  let userJsonWebToken;
  let id;
  let monument;

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
    id = JSON.parse(localStorage.monument);
    monument = await monumentService.getIndividualMonument(id);
  });
  const monumentService = getContext("MonumentService");
</script>

{#if monument}
  <div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-text-center" uk-grid>
      <div class="uk-width-1-2 uk-align-center">
        <!-- {{> editPointOfInterestForm}} -->
        <PointOfInterestForm
          addMonumentAction={false}
          existingMonumentRecord={monument}
          mapObject={undefined}
        />
      </div>
      <div class="uk-width-1-2">
        <EditPointOfInterestImage images={monument.images} />
        <!-- {{> editPointOfInterestImage}} -->
      </div>
    </div>
  </div>
{/if}
