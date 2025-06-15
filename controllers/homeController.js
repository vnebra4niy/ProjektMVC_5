const axios = require('axios');
const { MENU_LINKS } = require("../constants/navigation");
const apiKey = require("../config").TICKETMASTER_KEY;

exports.getHomeView = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 0;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=event&size=12&page=${page}&apikey=${apiKey}`;
    const resEvents = await axios.get(url);
    const events = resEvents.data._embedded ? resEvents.data._embedded.events : [];

    response.render("home", {
      headTitle: "Home",
      title: "Main Events",
      path: "/",
      activeLinkPath: "/",
      menuLinks: MENU_LINKS,
      events,
      currentPage: page
    });
  } catch (error) {
    console.error("Error:", error.message);
    response.status(500).send("Error getting data");
  }
};