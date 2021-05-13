<script>
  import { title, subTitle, navBar, loggedInUserBar } from "../stores";
  import MonumentList from "../components/MonumentList.svelte";
  import FilterComponent from "../components/FilterComponent.svelte";
  import SearchTitlesForm from "../components/SearchTitlesForm.svelte";
  title.set("Monuments");
  subTitle.set("Monuments added to date");

  navBar.set({
    bar: loggedInUserBar,
  });
</script>

<div class="uk-container uk-margin">
  <div class="uk-grid-small" uk-grid>
    <div class="uk-width-expand@m">
      <h1 class="uk-heading">Monuments Added To Date</h1>
    </div>
    <div class="uk-width-auto@m">
      <!-- {{> filterComponent}} -->

      <FilterComponent />
      <SearchTitlesForm />
    </div>
  </div>

  <div class="uk-width-auto@m">
    <div class="uk-margin">
      <!-- {{> searchTitlesForm}} -->
    </div>
  </div>
</div>

<div class="uk-divider-icon" />
<div
  class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
  uk-grid
>
  <div class="uk-width-expand@m">
    <MonumentList />
  </div>
</div>
