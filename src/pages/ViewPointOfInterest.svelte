<script>
import {title, subTitle, navBar, loggedInUserBar} from "../stores";
import {onMount, getContext, setContext} from 'svelte';
import ViewPointOfInterestImage from "../components/ViewPointOfInterestImage.svelte"; 
import ViewImageFullScreen from "../components/ViewImageFullScreen.svelte";
import MonumentCategoriesComponent from  "../components/MonumentCategoriesComponent.svelte";
import MonumentCoordinatesComponent from "../components/MonumentCoordinatesComponent.svelte";
import WeatherOverviewComponent from "../components/WeatherOverviewComponent.svelte";
import TemperatureOverviewComponent from "../components/TemperatureOverviewComponent.svelte";
import SunsetOverviewComponent from "../components/SunsetOverviewComponent.svelte";
import WeatherOverviewTable from "../components/WeatherOverviewTable.svelte";
import WeatherForecastTable from "../components/WeatherForecastTable.svelte";
import NoWeatherDataComponent from "../components/NoWeatherDataComponent.svelte";

import MonumentList from "../components/MonumentList.svelte";
  title.set("Monuments");
  subTitle.set("Detailed View");

  navBar.set({
    bar: loggedInUserBar
  });
  const monumentService = getContext("MonumentService");
  let monument;
  let weatherData;
  let id;

onMount(async () => {
    id = JSON.parse(localStorage.monument);
    monument = await monumentService.getIndividualMonument(id);
    weatherData = await monumentService.getMonumentWeather(id);
    console.log(weatherData);
  
  })
</script>
{#if monument}
<h1 class="uk-heading-medium uk-text-center">{monument.title}</h1>

<div class="uk-container uk-margin">
    <div class="uk-text-center uk-grid">
        <div class="uk-width-expand@m uk-first-column">

<ViewPointOfInterestImage monumentImages={monument.images} />
<ViewImageFullScreen monumentImages={monument.images} />

            <div class="uk-text-center uk-text-small uk-grid uk-margin-top" uk-grid>
                <div class="uk-width-expand@m uk-first-column">

                    <MonumentCategoriesComponent monumentCategories={monument.categories} />

                </div>

                <div class="uk-width-1-2@m">

                    <MonumentCoordinatesComponent monumentCoordinates={monument.coordinates} />

                </div>


            </div>


            {#if weatherData}
            
            <div class="uk-text-center uk-text-small uk-margin uk-width-expand@m">
                <div class="uk-card uk-card-default uk-card-body uk-padding-small">
                    <h4 class="uk-text-primary">Current Weather</h4>
                    <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                        <TemperatureOverviewComponent currentWeather={weatherData.currentWeather} />
                        <SunsetOverviewComponent sunset={weatherData.sunset} />
                        <WeatherOverviewComponent  currentWeatherDescription={weatherData.currentWeatherDescription}/>
                    </div>
                    <WeatherOverviewTable currentWeatherFormattedObject={weatherData.currentWeatherFormattedObject} />
                </div>

            </div>


            <div class="uk-text-center uk-text-small uk-margin uk-width-expand@m">
                <div class="uk-card uk-card-default uk-card-body uk-padding-small">
                    <h4 class="uk-text-primary">Weather Forecast</h4>
                     <WeatherForecastTable weatherForecastNextWeek={weatherData.weatherForecastNextWeek} />
                </div>

            </div>
          {:else}
            <NoWeatherDataComponent id={id} />

            {/if}




        </div>

        <div class="uk-width-1-3@m">

            <div class="uk-container">
                {monument.description}
            </div>


        </div>
    </div>
</div>
{/if}