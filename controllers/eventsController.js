const axios = require('axios');
const apiKey = require('../config').TICKETMASTER_KEY;
const { MENU_LINKS } = require("../constants/navigation");
const Reservation = require('../models/Reservation');

const fetchEvents = async (classification, page = 0) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&size=12&page=${page}&apikey=${apiKey}`;
  const response = await axios.get(url);
  return response.data._embedded ? response.data._embedded.events : [];
};

exports.getHomeEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const events = await fetchEvents('event', page);
    res.render('home', {
      title: "Main Events",
      events,
      menuLinks: MENU_LINKS,
      activeLinkPath: "/",
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching main events:", error.message);
    res.status(500).send("Failed to fetch main events from Ticketmaster API.");
  }
};

exports.getMusicEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const events = await fetchEvents("music", page);
    res.render("events/music", {
      title: "Music",
      events,
      menuLinks: MENU_LINKS,
      activeLinkPath: "/music",
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching music events:", error.message);
    res.status(500).send("Failed to fetch music events from Ticketmaster API.");
  }
};

exports.getStandupEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const events = await fetchEvents('comedy', page);
    res.render('events/standup', {
      title: "Stand-Up",
      events,
      menuLinks: MENU_LINKS,
      activeLinkPath: "/standup",
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching stand-up events:", error.message);
    res.status(500).send("Failed to fetch stand-up events from Ticketmaster API.");
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
    const response = await axios.get(url);
    const event = response.data;

    let reservedSeats = [];
    const reservation = await Reservation.findOne({ eventId });
    if (reservation) {
      reservedSeats = reservation.reservedSeats;
    }

    res.render('events/details', {
      title: event.name,
      event,
      menuLinks: MENU_LINKS,
      activeLinkPath: `/events/event/${eventId}`,
      reservedSeats
    });
  } catch (error) {
    console.error("Error fetching event details:", error.message);
    res.status(500).send("Failed to fetch event details from Ticketmaster API.");
  }
};
