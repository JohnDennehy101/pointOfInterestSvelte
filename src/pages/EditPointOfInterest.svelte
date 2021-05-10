<script>
  import { title, subTitle, navBar, loggedInUserBar } from "../stores";
  import { onMount, getContext, setContext } from "svelte";
  import PointOfInterestForm from "../components/PointOfInterestForm.svelte";
  import EditPointOfInterestImage from "../components/EditPointOfInterestImage.svelte";

  title.set("Point of Interest");
  subTitle.set("Edit Point of Interest");

  navBar.set({
    bar: loggedInUserBar,
  });

  let id;
  let monument;

  onMount(async () => {
    id = JSON.parse(localStorage.monument);
    monument = await monumentService.getIndividualMonument(id);
  });
  const monumentService = getContext("MonumentService");
</script>

{#if monument}
  <div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-text-center" uk-grid>
      <div class="uk-width-1-2 uk-align-center">
        <div
          class="uk-card uk-card-default uk-width-expand@m uk-card-body uk-box-shadow-large"
        >
          <h3 class="uk-card-title uk-text-center">Edit Monument</h3>

          <!-- {{> editPointOfInterestForm}} -->
          <PointOfInterestForm
            addMonumentAction={false}
            existingMonumentRecord={monument}
          />
        </div>
        <div class="uk-width-1-2">
          <EditPointOfInterestImage images={monument.images} />
          <!-- {{> editPointOfInterestImage}} -->
        </div>
      </div>
    </div>
  </div>
{/if}
