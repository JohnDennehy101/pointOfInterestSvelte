<script>
  import { title, subTitle, navBar, loggedInUserBar } from "../stores";
  import MonumentList from "../components/MonumentList.svelte";
  import UserAccountForm from "../components/UserAccountForm.svelte";
  title.set("Settings");
  subTitle.set("Edit Account Details");

  navBar.set({
    bar: loggedInUserBar,
  });
</script>

<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
    uk-grid
  >
    <div class="uk-width-auto@m">
      <img
        width="500"
        src="/src/assets/settingsImage.jpg"
        alt="Religious Sculpture on front of church"
      />
    </div>
    <div class="uk-width-expand@m">
      <div
        class="uk-card uk-card-default uk-width-xlarge uk-card-body uk-box-shadow-large"
      >
        <h3 class="uk-card-title uk-text-center">Your Details:</h3>
        <!-- {{> settings-form}}
                {{> error}} -->

        <UserAccountForm />
      </div>
    </div>
  </div>
</div>
