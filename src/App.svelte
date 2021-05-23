<script>
  //Move api calls out to components to tidy up
  import { onMount, getContext } from "svelte";
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
  import AddPointOfInterest from "./pages/AddPointOfInterest.svelte";
  import EditPointOfInterest from "./pages/editPointOfInterest.svelte";
  import UserSettings from "./pages/UserSettings.svelte";
  import Map from "./pages/Map.svelte";
  import AdminView from "./pages/AdminView.svelte";

  setContext("UserService", new UserService("http://34.252.154.124:4000/"));
  setContext(
    "MonumentService",
    new MonumentService("http://34.252.154.124:4000/")
  );

  import { navBar, subTitle, title } from "./stores";

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/report": Report,
    "/logout": Main,
    "/addMonument": AddPointOfInterest,
    "/viewMonument/:id": ViewPointOfInterest,
    "/editMonumentView/:id": EditPointOfInterest,
    "/settings": UserSettings,
    "/map": Map,
    "/admin": AdminView,
  };
</script>

<Navigator />
<div class="uk-container">
  <Router {routes} />
</div>
