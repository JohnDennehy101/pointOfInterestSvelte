<script>
  import {
    title,
    subTitle,
    navBar,
    welcomeBar,
    navBarIconDisplay,
  } from "../stores";
  import UserAccountForm from "../components/UserAccountForm.svelte";
  import signupScreenImage from "/src/assets/castle.jpg";
  title.set("Point of Interest Application");
  subTitle.set("Please Sign Up");
  navBarIconDisplay.set("display:none");

  navBar.set({
    bar: welcomeBar,
  });
</script>

<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
    uk-grid
  >
    <div>
      <img width="300" src={signupScreenImage} alt="Castle" />
    </div>
    <div>
      <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large">
        <h3 class="uk-card-title uk-text-center">Please enter details below</h3>
        <UserAccountForm signUpAction={true} />
      </div>
    </div>
  </div>
</div>
