<script>
  export let allUsers;
</script>

<table class="uk-table uk-table-divider">
  <thead>
    <tr>
      <th class="uk-text-center" style="width: 50%">User Name</th>
      <!-- <th class="uk-text-center" style="width: 33.33%">Number of Existing Records</th> -->
      <th class="uk-text-center" style="width: 50%">Last Login</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each allUsers as user}
      <tr>
        <td class="uk-text-center" style="width: 33.33%"
          >{user.firstName} {user.lastName}</td
        >
        <!-- // <td class="uk-text-center" style="width: 33.33%">{numberOfRecords}</td> -->
        <td class="uk-text-center" style="width: 33.33%">{user.lastLogin}</td>
        <!-- <td>
          <p style="display: none">{user._id}</p>
          <a
            href="#delete-account-modal"
            class="deleteUserIcon"
            uk-toggle
            dataset={user._id}
          >
            <i class="fas fa-trash-alt" style="color: red" />
          </a>
        </td> -->
      </tr>
    {/each}
  </tbody>
</table>
