<script>
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
    navBarIconDisplay,
  } from "../stores";
  import { onMount, getContext, setContext } from "svelte";
  import PointOfInterestForm from "../components/PointOfInterestForm.svelte";
  import { LeafletMap } from "../services/leaflet-map";
  import "leaflet/dist/leaflet.css";
  import OffCanvasNav from "../components/OffCanvasNav.svelte";

  title.set("Point of Interest");
  subTitle.set("Add a new Point of Interest");
  navBarIconDisplay.set("display: block");

  let map;
  let userJsonWebToken;
  let latitude = 53.360858;
  let longitude = -7.65242;

  navBar.set({
    bar: loggedInUserBar,
  });
  const monumentService = getContext("MonumentService");
  const userService = getContext("UserService");

  onMount(async function () {
    userJsonWebToken = JSON.parse(localStorage.user);
    let success = await userService.getIndividualUser(userJsonWebToken);

    if (success) {
      if (success.userType === "Admin") {
        navBar.set({
          bar: loggedInAdminUserBar,
        });
      } else {
        navBar.set({
          bar: loggedInUserBar,
        });
      }
    }
    const mapConfig = {
      location: { lat: latitude, lng: longitude },
      zoom: 6,
      minZoom: 1,
    };
    map = new LeafletMap("monument-map", mapConfig, "Terrain");
    map.showZoomControl();
    map.showLayerControl();
  });
</script>

<OffCanvasNav />
<div class="uk-container uk-margin">
  <div
    class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center"
    uk-grid
  >
    <div class="uk-width-auto@m">
      <!-- <img
        width="300"
        src="/src/assets/dashboardImage.jpg"
        alt="Sculpture of Plato"
      /> -->
      <div
        id="monument-map"
        class="ui embed"
        style="height:600px; width: 400px"
      />
    </div>
    {#if map}
      <PointOfInterestForm
        addMonumentAction={true}
        existingMonumentRecord={undefined}
        mapObject={map}
      />
    {/if}
    <!-- <div class="uk-width-expand@m">{{> addPointOfInterest }}</div> -->
  </div>
</div>
