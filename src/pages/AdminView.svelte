<script>
  import { onMount, getContext } from "svelte";
  import AdminTotalNumberOfMonuments from "../components/AdminTotalNumberOfMonuments.svelte";
  import AdminTotalNumberOfUsers from "../components/AdminTotalNumberOfUsers.svelte";
  import AdminTotalNumberOfCategories from "../components/AdminTotalNumberOfCategories.svelte";
  import AdminUserOverviewForm from "../components/AdminUserOverviewForm.svelte";
  import OffCanvasNav from "../components/OffCanvasNav.svelte";
  import {
    title,
    subTitle,
    navBar,
    loggedInUserBar,
    loggedInAdminUserBar,
    navBarIconDisplay,
  } from "../stores";

  title.set("Admin Dashboard");
  subTitle.set("Application Statistics");
  navBarIconDisplay.set("display:block");

  let monumentList;
  let userList;
  let allMonumentsCount;
  let allUsersCount;
  let monumentCategoryList;
  let monumentCategoryCount;
  const monumentService = getContext("MonumentService");
  const userService = getContext("UserService");

  onMount(async function () {
    monumentList = await monumentService.getMonuments();
    allMonumentsCount = monumentList.length;
    userList = await userService.getUsers();
    allUsersCount = userList.length;
    monumentCategoryList = await monumentService.getNonProvinceCategories();
    monumentCategoryCount = monumentCategoryList.length;
  });
</script>

<OffCanvasNav />
<div class="uk-container uk-margin">
  <div class="uk-width-expand@m">
    <h1 class="uk-heading">Application Overview</h1>
  </div>

  <div class="uk-divider-icon" />

  <div class="uk-child-width-expand@s uk-text-center uk-margin" uk-grid>
    <div>
      {#if allMonumentsCount}
        <AdminTotalNumberOfMonuments {allMonumentsCount} />
      {/if}
    </div>
    <div>
      {#if monumentCategoryCount}
        <AdminTotalNumberOfCategories
          allCategoriesCount={monumentCategoryCount}
        />
      {/if}
    </div>
    <div>
      {#if allMonumentsCount}
        <AdminTotalNumberOfUsers {allUsersCount} />
      {/if}
    </div>
  </div>

  <div class="uk-card uk-card-default uk-card-body uk-padding-small">
    <h4 class="uk-text-primary uk-text-center">User Overview</h4>
    {#if userList}
      <AdminUserOverviewForm allUsers={userList} />
      <!-- {{> userOverviewForm}} -->
    {/if}
  </div>

  <!-- {{> adminDeleteUserModal}} -->
</div>
