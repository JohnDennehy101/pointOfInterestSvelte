<script>
  import {
    title,
    subTitle,
    navBar,
    welcomeBar,
    navBarIconDisplay,
  } from "../stores";
  import LoginForm from "../components/LoginForm.svelte";
  import loginScreenImage from "/src/assets/loginScreenImage.jpg";
  title.set("Point of Interest Application");
  subTitle.set("Please Log in");
  navBarIconDisplay.set("display:none");
  // let offsetNavIcon = document.getElementsByClassName("fas fa-bars fa-2x");

  // offsetNavIcon[0].style.display = "none";

  navBar.set({
    bar: welcomeBar,
  });
</script>

<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center uk-grid"
    uk-grid
  >
    <div>
      <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large">
        <h3 class="uk-card-title uk-text-center">Welcome back!</h3>
        <LoginForm />
      </div>
    </div>
    <div>
      <img width="300" src={loginScreenImage} alt="Dublin Customs House" />
    </div>
  </div>
</div>
