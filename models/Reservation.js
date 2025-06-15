const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  reservedSeats: [
    {
      row: Number,
      col: Number
    }
  ]
});

module.exports = mongoose.model('Reservation', reservationSchema);