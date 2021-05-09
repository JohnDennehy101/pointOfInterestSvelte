<script>
    export let currentWeatherFormattedObject;
</script>


<table class="uk-table uk-table-divider">
    <thead>
        <tr>
            <th class="uk-text-center">Metric</th>
            <th class="uk-text-center">Value</th>


        </tr>
    </thead>
    <tbody>
        {#each Object.entries(currentWeatherFormattedObject) as [metric, value]}
        <tr>
            <td style="width: 50%">{metric}</td>
            <td>{value}</td>


        </tr>
        {/each}

    </tbody>
</table>