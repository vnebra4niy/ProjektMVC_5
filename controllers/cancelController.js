const Reservation = require('../models/Reservation');

exports.cancelAllSeats = async (req, res) => {
  const { eventId } = req.body;

  try {
    await Reservation.findOneAndDelete({ eventId });
    res.redirect(`/events/event/${eventId}`);
  } catch (error) {
    console.error("Error clearing reservations:", error);
    res.status(500).send("Failed to clear reservations.");
  }
};