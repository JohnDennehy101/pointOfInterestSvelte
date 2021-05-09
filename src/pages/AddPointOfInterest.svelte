<script>
import {title, subTitle, navBar, loggedInUserBar} from "../stores";
import {onMount, getContext, setContext} from 'svelte';
import AddPointOfInterestForm from "../components/AddPointOfInterestForm.svelte";

title.set("Point of Interest");
  subTitle.set("Add a new Point of Interest");

  navBar.set({
    bar: loggedInUserBar
  });
  const monumentService = getContext("MonumentService");
</script>


<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div class="uk-width-auto@m">
            <img width="300" src="/src/assets/dashboardImage.jpg" alt="Sculpture of Plato" />

        </div>
<AddPointOfInterestForm />
        <!-- <div class="uk-width-expand@m">{{> addPointOfInterest }}</div> -->
    </div>

</div>