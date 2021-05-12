<script>
  import { onMount, getContext } from "svelte";
  import { MonumentService } from "../services/monument-service";
  import { push } from "svelte-spa-router";

  const monumentService = getContext("MonumentService");

  let monumentList = [];
  onMount(async () => {
    monumentList = await monumentService.getMonuments();
    console.log(monumentList);
  });

  let setLocalStorageMonumentId = (id) => {
    localStorage.monument = JSON.stringify(id);
  };

  let deleteMonument = () => {
    let success = monumentService.deleteMonument(localStorage.monument);
    if (success) {
      document.getElementById("delete-monument-modal").style.display = "none";
      monumentList.splice(
        monumentList.findIndex(
          (x) =>
            (x._id = localStorage.monument.substring(
              1,
              localStorage.monument.length - 1
            ))
        ),
        1
      );
      localStorage.monument = null;
      location.reload();
      push("/report");
    } else {
      console.log("failing on deletion of monument");
    }
    //console.log(localStorage.monument);
  };
</script>

<div
  class="uk-grid-medium uk-child-width-1-3@m"
  uk-grid
  uk-height-match="target: > div > .uk-card > .uk-card-body"
>
  {#each monumentList as monument}
    <div>
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top uk-cover-container">
          <img
            src={monument.images[0].imageUrl}
            class="uk-responsive-height uk-responsive-width"
            uk-cover
            alt=""
          />
          <canvas width="390" height="250" />
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">{monument.title}</h3>
        </div>
        <div class="uk-card-footer">
          <div uk-grid>
            <div class="uk-width-1-3@m">
              <a
                href="#delete-monument-modal"
                data-id={monument._id}
                uk-toggle
                class="deleteMonumentButton"
                style="width: 10px"
              >
                <span
                  class="uk-margin-small-right uk-align-left"
                  on:click={() => setLocalStorageMonumentId(monument._id)}
                  uk-icon="trash"
                  style="color: red; cursor:pointer;"
                />
              </a>
            </div>
            <div class="uk-width-1-3@m">
              <a
                href="/#/viewMonument/{monument._id}"
                on:click={() => setLocalStorageMonumentId(monument._id)}
                class="uk-button uk-button-text">View</a
              >
            </div>
            <div class="uk-width-1-3@m">
              <a
                href="/#/editMonumentView/{monument._id}"
                on:click={() => setLocalStorageMonumentId(monument._id)}
                class="editMonumentButton"
                ><span
                  class="uk-margin-small-right uk-align-right"
                  uk-icon="pencil"
                  style="color: blue"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}

  <!-- This is the modal -->

  <div id="delete-monument-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Delete Monument</h2>
      <p id="deleteWarningMessage" />
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button"
          >Cancel</button
        >

        <button
          on:click={deleteMonument}
          class="uk-button uk-button-danger"
          type="submit"
          id="deleteButton"
          formmethod="post">Delete</button
        >
      </p>
    </div>
  </div>
</div>
