const { LOGOUT_LINKS } = require("../constants/navigation");
const { MENU_LINKS } = require("../constants/navigation")

exports.getLogoutView = (request, response) => {
  response.render("logout.ejs", {
    headTitle: "Logout",
    path: "/logout",
    activeLinkPath: "/logout",
    menuLinks: MENU_LINKS
  });
};

exports.killApplication = (request, response) => {
  process.exit();
};