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

export const navBar = writable({
  bar: [],
});
export const title = writable("");
export const subTitle = writable("");