<script>
  import { title, subTitle, navBar, welcomeBar } from "../stores";
  import { onMount, getContext } from "svelte";
  import { push } from "svelte-spa-router";
  const userService = getContext("UserService");
  //   import homer2 from "/src/assets/homer2.png";
  title.set("Point of Interest Application");
  subTitle.set("Sign up or Log in");

  import dublinCastleImage from "/src/assets/dublinCastle.jpg";

  navBar.set({
    bar: welcomeBar,
  });

  onMount(async () => {
    await userService.logout();
    push("/");
  });
</script>

<!-- <div class="uk-flex uk-flex-center uk-flex-middle uk-grid-small" uk-grid>
        {{> title-card title="Point of Interest Application" subTitle="Sign up or log in"}}
        {{> welcome-menu }}
    </div> -->

<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
    uk-grid
  >
    <div class="uk-width-auto@m">
      <img width="300" src={dublinCastleImage} alt="Dublin Castle" />
    </div>
    <div class="uk-width-expand@m">
      <h1 class="uk-heading-small">Point of Interest Application</h1>
      <p>
        A point of interest web application that shows interesting national
        monument specific point locations.
      </p>
    </div>
  </div>
</div>
