<script>
  import Title from "./Title.svelte";
  import {navBar} from "../stores"
</script>

<div class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small" uk-grid>
  <Title title="Point of Interest Application" subTitle="Sign Up or Log In" />
  <div>
    <ul class="uk-iconnav uk-margin-left">

    {#each $navBar.bar as nav}
        <a href="{nav.link}" class="uk-card uk-card-small uk-card-hover uk-padding-small">
          <i class="{nav.icon}" style="{nav.colour}" uk-tooltip="title: {nav.title}; pos:bottom"></i>
        </a>
      {/each}

    <!-- <a href="/#/signup" class="uk-card-hover uk-padding-small">
        <i class="fas fa-user-cog fa-3x" style="color:rgb(63, 160, 155)" title="Sign up" pos="bottom" uk-tooltip></i>
    </a>
    <a href="/#/login" class="uk-card-hover uk-padding-small">
        <i class="fas fa-user-edit fa-3x" style="color:green" title="Log in" pos="bottom" uk-tooltip></i>
    </a> -->
</ul>
  </div>
</div>