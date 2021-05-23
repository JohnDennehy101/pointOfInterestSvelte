<script>
  import { onMount } from "svelte";
  export let currentWeatherDescription;
  let weatherIcon;

  onMount(function () {
    if (currentWeatherDescription !== "") {
      if (
        currentWeatherDescription == "Drizzle" ||
        currentWeatherDescription == "Rain" ||
        currentWeatherDescription == "Mist"
      ) {
        weatherIcon = "/src/assets/rain.png";
      } else if (currentWeatherDescription == "Snow") {
        weatherIcon = "/src/assets/snowflake.png";
      } else if (
        currentWeatherDescription == "Clouds" ||
        currentWeatherDescription == "Fog"
      ) {
        weatherIcon = "/src/assets/cloud.png";
      } else if (currentWeatherDescription == "Thunderstorm") {
        weatherIcon = "/src/assets/umbrella.png";
      } else if (currentWeatherDescription == "Clear") {
        weatherIcon = "/src/assets/sun.png";
      } else {
        weatherIcon = "/src/assets/sun.png";
      }
    }
  });
</script>

<div>
  <div class="uk-card uk-card-default uk-card-body">
    <h5>Overview</h5>

    <img
      src={weatherIcon}
      id="weatherDescriptionIcon"
      width="50"
      alt="Weather Description Icon"
    />

    <p>{currentWeatherDescription}</p>
  </div>
</div>
