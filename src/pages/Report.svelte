<script>
  import { title, subTitle, navBar, loggedInUserBar } from "../stores";
  import MonumentList from "../components/MonumentList.svelte";
  title.set("Monuments");
  subTitle.set("Monuments added to date");

  navBar.set({
    bar: loggedInUserBar,
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
