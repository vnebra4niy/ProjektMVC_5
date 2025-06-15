const HOME_LINK = {
  label: "Home",
  path: "/",
};

const LOGOUT_LINKS = [
  HOME_LINK,
  { label: "Logout from application", path: "/kill" },
];

const MENU_LINKS = [
  HOME_LINK,
  { label: "Music", path: "/events/music" },
  { label: "Stand-up", path: "/events/standup" },
  { label: "Logout", path: "/logout" },
];

module.exports = {
  MENU_LINKS,
  LOGOUT_LINKS,
};
