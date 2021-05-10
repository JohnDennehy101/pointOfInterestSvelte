<script>
  export let currentWeather;
</script>

<div>
  <div class="uk-card uk-card-default uk-card-body">
    <h5>Temperature</h5>

    <img src="/src/assets/thermometer.png" width="50" alt="Thermometer icon" />

    <p>{currentWeather.temp}°C</p>
  </div>
</div>
