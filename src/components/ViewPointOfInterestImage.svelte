<script>
export let monumentImages;

</script>

<div class="uk-card-media-left">

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow> 

         <ul class="uk-slideshow-items">
            {#each monumentImages as image}
            <li>

                <img style="max-width: 888px !important; max-height: 500px !important" width="500" height="500"
                    data-src="{image.imageUrl}" alt="" uk-cover uk-img="target: !.uk-slideshow-items">
                <canvas width="600" height="600"></canvas>
            </li>
            {/each}
        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous
            uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next
            uk-slideshow-item="next"></a>

     </div>

</div>