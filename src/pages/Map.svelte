<script>
  import "leaflet/dist/leaflet.css";
  import {
    loggedInUserBar,
    navBar,
    subTitle,
    title,
    loggedInAdminUserBar,
  } from "../stores";
  import { LeafletMap } from "../services/leaflet-map";
  import { onMount, getContext } from "svelte";

  let lat = 53.160858;
  let lng = -7.15242;
  let monumentList;
  let userJsonWebToken;

  const userService = getContext("UserService");
  const monumentService = getContext("MonumentService");

  let map;
  onMount(async () => {
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
      location: { lat: lat, lng: lng },
      zoom: 7,
      minZoom: 1,
    };
    map = new LeafletMap("monuments-map", mapConfig, "Terrain");
    map.showZoomControl();
    map.addLayerGroup("National Monuments");
    map.showLayerControl();

    monumentList = await monumentService.getMonuments();

    addMonumentMarkers(monumentList);
  });

  title.set("Point Of Interest Application");
  subTitle.set("Map of all National Monuments");
  navBar.set({
    bar: loggedInUserBar,
  });

  function addMonumentMarkers(monumentList) {
    for (let monument in monumentList) {
      if (
        monumentList[monument].coordinates.latitude <= 55.36662484928637 &&
        monumentList[monument].coordinates.latitude >= 51.42661449707482 &&
        monumentList[monument].coordinates.longitude >= -10.612792968750002 &&
        monumentList[monument].coordinates.longitude <= -5.449218750000001
      ) {
        map.addMarker(
          {
            lat: monumentList[monument].coordinates.latitude,
            lng: monumentList[monument].coordinates.longitude,
          },
          monumentList[monument].title,
          "National Monuments"
        );
      }
    }
  }
</script>

<div class="uk-flex-middle uk-text-center" uk-grid>
  <div
    class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-1-1"
  >
    <div id="monuments-map" class="ui embed" style="height:800px" />
  </div>
</div>
