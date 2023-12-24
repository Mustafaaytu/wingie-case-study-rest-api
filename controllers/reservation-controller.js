const Reservation = require('../models/reservation');
const Payment = require('../models/payment');

const get = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const findById = async (req, res) => {
  try {
    const {id} = req.params;
    const reservation = await Reservation.findById(id).populate('activity');
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const create = async (req, res) => {
  try {
    const userId = req.userId;
    const activityId = req.body.activityId;

    const reservation = await Reservation.create({
      ...req.body,
      user: userId,
      activity: activityId,
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const payment = async (req, res) => {
  try {
    const {id} = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res
        .status(404)
        .json({message: `cannot find any reservation with ID ${id}`});
    }

    await Payment.create({
      ...req.body,
      reservation: id,
    });
    res.status(200).json({message: 'Payment is successful'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  get,
  findById,
  create,
  payment,
};
