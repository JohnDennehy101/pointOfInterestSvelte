<script>
  import MonumentCoordinatesTable from "./MonumentCoordinatesTable.svelte";
  export let monumentCoordinates;
</script>

<div
  class="uk-card uk-card-default uk-card-body uk-padding-small"
  style="height: 250px"
>
  <h4 class="uk-text-primary">GPS Coordinates</h4>
  <!-- {{> monumentCoordinatesTable}} -->
  <MonumentCoordinatesTable coordinates={monumentCoordinates} />
</div>
