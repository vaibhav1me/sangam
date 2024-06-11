import home from "@/app/assets/images/NavLinksImages/home.svg";
import explore from "@/app/assets/images/NavLinksImages/explore.svg";
import chats from "@/app/assets/images/NavLinksImages/chats.svg";
import profile from "@/app/assets/images/NavLinksImages/profile.svg";
import create from "@/app/assets/images/NavLinksImages/create.svg";

export const NavLinks = [
  {
    linkNo: 1,
    iconImg: home,
    title: "Home",
    url: "/",
  },
  {
    linkNo: 2,
    iconImg: explore,
    title: "Explore",
    url: "/explore",
  },
  {
    linkNo: 3,
    iconImg: chats,
    title: "Chats",
    url: "/chats",
  },
  {
    linkNo: 4,

    iconImg: create,
    title: "Post",
    url: "/create",
  },
  {
    linkNo: 5,
    iconImg: profile,
    title: "Profile",
    url: "/profile",
  },
];
