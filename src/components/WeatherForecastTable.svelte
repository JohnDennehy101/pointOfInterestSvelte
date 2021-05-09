<script>
    export let weatherForecastNextWeek;
</script>

<table class="uk-table uk-table-divider">
    <thead>
        <tr>
            <th class="uk-text-center">Day</th>
            <th class="uk-text-center">Overview</th>
            <th class="uk-text-center">Description</th>

        </tr>
    </thead>
    <tbody>
        {#each weatherForecastNextWeek as individualForecast}
        <tr>
            <td>{individualForecast.Date}</td>
            <td>{individualForecast.Summary}</td>
            <td>{individualForecast.Description}</td>

        </tr>
        {/each}

    </tbody>
</table>