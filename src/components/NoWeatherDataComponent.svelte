<script>
  export let id;
</script>

<div class="uk-margin-top">
  <div class="uk-card uk-card-default uk-card-large uk-card-body">
    <h3 class="uk-card-title">No Weather Data</h3>
    <p>
      No weather was found for the coordinates provided. The coordinates can be
      edited on the edit monument screen.
    </p>

    <a href="/editMonumentView/{id}">
      <button class="uk-button uk-button-secondary">Edit Monument</button>
    </a>
  </div>
</div>
