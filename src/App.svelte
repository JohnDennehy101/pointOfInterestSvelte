  <script>
    //Move api calls out to components to tidy up
    import {onMount, getContext} from 'svelte'
    import { UserService } from "./user-service";
    import { setContext } from "svelte";
    import Navigator from "./components/Navigator.svelte";
    import Router from "svelte-spa-router";
    import Main from "./pages/Main.svelte"

    const url = `http://jd-2.local:4000/api/users`;

    setContext("UserService", new UserService("http://jd-2.local:4000"));


  import {navBar, subTitle, title} from "./stores"


    let routes = {
      "/": Main
    //"/signup": Candidates,
    //"/login": Donations,
  }

   
//This would be moved out to externals
     const userService = getContext("UserService");


    let userList;
  onMount(async () => {
    //const response = await fetch(url)
    userList = await userService.getUsers();
    //candidateList = await response.json();
    console.log(userList)
  })
  </script>

<div class="uk-container">
  <Navigator/>

   <Router {routes} />

</div>