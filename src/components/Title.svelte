<script>
  import { title, subTitle, navBarIconDisplay } from "../stores.js";
</script>

<div class="uk-padding-small uk-first-column">
  <a href="#" uk-toggle="target: #offcanvas-nav" style={$navBarIconDisplay}>
    <i class="fas fa-bars fa-2x" title="Index of all monuments" uk-tooltip />
  </a>
</div>

<div
  class="uk-width-1-3@m uk-card uk-card-default uk-padding-small uk-visible@m uk-first-column"
>
  <div class="uk-grid">
    <div class="uk-width-1-6@m">
      <i class="fas fa-landmark fa-3x" />
    </div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="title">
        {$title}
      </div>
      <div class="uk-text-muted uk-text-small">
        {$subTitle}
      </div>
    </div>
    <div class="uk-card uk-card-small uk-text-center uk-padding-remove">
      <a
        target="_blank"
        href="https://www.archaeology.ie/national-monuments/search-by-county"
      >
        <div>
          <i
            class="fas fa-link fa-3x"
            style="color:rgb(95, 96, 173)"
            title="Link to archive of Irish monuments"
            uk-tooltip
          />
        </div>
        <div class="uk-width-expand@m uk-text-left">
          <div class="uk-text-muted uk-text-center" style="font-size:xx-small">
            Monument Archive
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
