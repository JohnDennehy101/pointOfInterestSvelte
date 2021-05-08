<script>
import {title, subTitle, navBar, loggedInUserBar} from "../stores";
import MonumentList from "../components/MonumentList.svelte";
  title.set("Monuments");
  subTitle.set("Monuments added to date");

  navBar.set({
    bar: loggedInUserBar
  });
</script>


<p>Testing...</p>
<MonumentList />