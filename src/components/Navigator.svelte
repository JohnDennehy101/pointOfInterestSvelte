<script>
  import Title from "./Title.svelte";
  import {navBar} from "../stores"
</script>


<div class="uk-flex uk-flex-center uk-margin uk-flex-middle uk-grid-small uk-grid-small" uk-grid>
  <Title />
  <div>
    <ul class="uk-iconnav uk-margin-left">

    {#each $navBar.bar as nav}
        <a href="{nav.link}" class="uk-card uk-card-small uk-card-hover uk-padding-small">
          <i class="{nav.icon}" style="{nav.colour}" uk-tooltip="title: {nav.title}; pos:bottom"></i>
        </a>
      {/each}

   
</ul>
  </div>
</div>
