  <script>
    //Move api calls out to components to tidy up
    import {onMount, getContext} from 'svelte'
    import { UserService } from "./services/user-service";
    import { MonumentService } from "./services/monument-service";
    import { setContext } from "svelte";
    import Navigator from "./components/Navigator.svelte";
    import Router from "svelte-spa-router";
    import Main from "./pages/Main.svelte";
    import Login from "./pages/Login.svelte";
    import Signup from "./pages/Signup.svelte";
    import Report from "./pages/Report.svelte";
    import ViewPointOfInterest from "./pages/ViewPointOfInterest.svelte";

    setContext("UserService", new UserService("http://jd-2.local:4000"));
    setContext("MonumentService", new MonumentService("http://jd-2.local:4000"));


  import {navBar, subTitle, title} from "./stores"


    let routes = {
      "/": Main,
      "/login": Login,
      "/signup": Signup,
      "/report": Report,
      "/logout": Main,
      "/viewMonument/:id": ViewPointOfInterest
  
    
  }

   
  </script>


  <Navigator/>
  <div class="uk-container">

   <Router {routes} />

</div>