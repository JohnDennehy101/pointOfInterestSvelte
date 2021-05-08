import { writable } from "svelte/store";

export const welcomeBar = [{
  title: "Sign Up",
  icon: "fas fa-user-cog fa-3x",
  colour: "color:rgb(63, 160, 155)",
  link: "/#/signup",
}, {
  title: "Log In",
  icon: "fas fa-user-edit fa-3x",
  colour: "color:green",
  link: "/#/login",
}];

export const loggedInUserBar = [{
  title: "Add Monument",
  icon: "fas fa-plus-circle fa-3x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/addMonument",
}, {
  title: "Report",
  icon: "fas fa-th-list fa-3x",
  colour: "color:rgb(63, 122, 139)",
  link: "/#/report",
},
{
  title: "Logout",
  icon: "fas fa-sign-out-alt fa-3x",
  colour: "color:rgb(156, 70, 128)",
  link: "/#/logout",
}];

export const navBar = writable({
  bar: [],
});
export const title = writable("");
export const subTitle = writable("");