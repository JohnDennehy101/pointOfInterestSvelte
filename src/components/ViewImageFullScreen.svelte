<script>
  export let monumentImages;
</script>

<div uk-lightbox class="uk-margin-top">
  <a
    class="uk-button uk-button-primary"
    data-type="image"
    data-caption={monumentImages[0].title}
    href={monumentImages[0].imageUrl}>View Full Screen Image</a
  >

  {#each monumentImages as image}
    <div>
      <a class="uk-inline" href={image.imageUrl} data-caption={image.title}>
        <img src={image.imageUrl} style="display: none" alt="" />
      </a>
    </div>
  {/each}
</div>
