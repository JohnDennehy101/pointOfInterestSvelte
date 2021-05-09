<script>
export let monumentCategories;

</script>

<div class="uk-card uk-card-default uk-card-body uk-padding-small" style="height: 250px">
    <h4 class="uk-text-primary">Categories</h4>
    <ul class="uk-list">
        {#each monumentCategories as category}
        <ul class="uk-list uk-list-circle">{category.title}</ul>
        {/each}

    </ul>

</div>