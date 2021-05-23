<script>
  import { getContext, onMount } from "svelte";
  let provinceCategories;
  let otherCategories;
  let monumentService = getContext("MonumentService");

  let setLocalStorageMonumentId = (id) => {
    localStorage.monument = JSON.stringify(id);
  };

  onMount(async function () {
    otherCategories = await monumentService.getNonProvinceCategories();
    console.log(otherCategories.monuments);
    provinceCategories = await monumentService.getProvinceCategories();
  });
</script>

<div id="offcanvas-nav" uk-offcanvas="overlay: true">
  <div class="uk-offcanvas-bar">
    <button
      class="uk-offcanvas-close uk-icon uk-close"
      type="button"
      uk-close
    />

    <li class="uk-nav-header">Province</li>
    {#if provinceCategories}
      {#each provinceCategories as province}
        <ul class="uk-nav uk-nav-default uk-nav-parent-icon">
          <li class="uk-parent">
            <a href="#" uk-toggle="target: .toggle-display-{province.title}"
              >{province.title}</a
            >
            <ul class="uk-nav-sub toggle-display-{province.title}" hidden>
              {#if province.monuments}
                {#each province.monuments as monument}
                  <li>
                    <a
                      on:click={() => setLocalStorageMonumentId(monument._id)}
                      href="/#/viewMonument/{monument._id}">{monument.title}</a
                    >
                  </li>
                {/each}
              {/if}
            </ul>
          </li>
        </ul>
      {/each}
    {/if}

    <li class="uk-nav-header">Other Categories</li>
    {#if otherCategories}
      {#each otherCategories as category}
        <ul class="uk-nav uk-nav-default uk-nav-parent-icon">
          <li class="uk-parent">
            <a href="#" uk-toggle="target: .toggle-display-{category.title}"
              >{category.title}</a
            >
            <ul class="uk-nav-sub toggle-display-{category.title}" hidden>
              {#if category.monuments}
                {#each category.monuments as monument}
                  <li>
                    <a
                      on:click={() => setLocalStorageMonumentId(monument._id)}
                      href="/#/viewMonument/{monument._id}">{monument.title}</a
                    >
                  </li>
                {/each}
              {/if}
            </ul>
          </li>
        </ul>
      {/each}
    {/if}
  </div>
</div>
