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
        weatherIcon = "/rain.png";
      } else if (currentWeatherDescription == "Snow") {
        weatherIcon = "/snowflake.png";
      } else if (
        currentWeatherDescription == "Clouds" ||
        currentWeatherDescription == "Fog"
      ) {
        weatherIcon = "/cloud.png";
      } else if (currentWeatherDescription == "Thunderstorm") {
        weatherIcon = "/umbrella.png";
      } else if (currentWeatherDescription == "Clear") {
        weatherIcon = "/sun.png";
      } else {
        weatherIcon = "/sun.png";
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
