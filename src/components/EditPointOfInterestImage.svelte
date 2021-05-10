<script>
  export let images;
</script>

<div
  class="uk-position-relative uk-visible-toggle uk-light"
  tabindex="-1"
  uk-slideshow
>
  <ul
    class="uk-slideshow-items"
    id="imagesList"
    style="height: 600px !important"
  >
    {#each images as image}
      <li>
        <img
          data-src={image.imageUrl}
          alt=""
          uk-img="target: !.uk-slideshow-items"
          uk-cover
        />
        <canvas width="600" height="900" />
      </li>
    {/each}
  </ul>

  <a
    class="uk-position-center-left uk-position-small uk-hidden-hover"
    href="#"
    uk-slidenav-previous
    uk-slideshow-item="previous"
  />
  <a
    class="uk-position-center-right uk-position-small uk-hidden-hover"
    href="#"
    uk-slidenav-next
    uk-slideshow-item="next"
  />
</div>
