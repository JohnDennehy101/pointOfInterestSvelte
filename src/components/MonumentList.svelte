<script>
  import {onMount, getContext} from 'svelte'
  import { MonumentService } from "../services/monument-service";

  import {viewMonumentId} from "../stores";

  const monumentService = getContext("MonumentService");

  let monumentList = [];
  onMount(async () => {
    monumentList = await monumentService.getMonuments();
  })

  let test = ((id) => {
      console.log(id);
      viewMonumentId.set(id);
   
  })
</script>


<div class="uk-grid-medium uk-child-width-1-3@m" uk-grid uk-height-match="target: > div > .uk-card > .uk-card-body">
    {#each monumentList as monument}
    <div>
        <div class="uk-card uk-card-default">
            <div class="uk-card-media-top uk-cover-container">
                <img src={monument.images[0].imageUrl} class="uk-responsive-height uk-responsive-width" uk-cover alt="">
                <canvas width="390" height="250"></canvas>
            </div>
            <div class="uk-card-body">
                <h3 class="uk-card-title">{monument.title}</h3>


            </div>
            <div class="uk-card-footer">




                <div uk-grid>
                    <div class="uk-width-1-3@m">
                        <a href="#delete-monument-modal" data-id="{monument._id}" uk-toggle class="deleteMonumentButton"
                            style="width: 10px"><span class="uk-margin-small-right uk-align-left" uk-icon="trash"
                                style="color: red"></span>
                        </a>
                    </div>
                    <div class="uk-width-1-3@m">
                        <a href="/#/viewMonument/{monument._id}" on:click={test(monument._id)} class="uk-button uk-button-text">View</a>
                    </div>
                    <div class="uk-width-1-3@m">
                        <a href="editMonumentView/{monument._id}" class="editMonumentButton"><span
                                class="uk-margin-small-right uk-align-right" uk-icon="pencil"
                                style="color: blue"></span>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </div>
    {/each}
</div>