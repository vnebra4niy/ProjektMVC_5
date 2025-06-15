const Reservation = require('../models/Reservation');

exports.reserveSeats = async (req, res) => {
  const { eventId, selectedSeats } = req.body;

  try {
    const parsedSeats = JSON.parse(selectedSeats);

    let reservation = await Reservation.findOne({ eventId });

    if (!reservation) {
      reservation = new Reservation({ eventId, reservedSeats: [] });
    }

    const alreadyTaken = reservation.reservedSeats.filter(rs =>
      parsedSeats.some(s => s.row === rs.row && s.col === rs.col)
    );

    if (alreadyTaken.length > 0) {
      return res.status(400).send("Some seats already taken.");
    }

    reservation.reservedSeats.push(...parsedSeats);
    await reservation.save();

    res.redirect(`/events/event/${eventId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Reservation failed.");
  }
};