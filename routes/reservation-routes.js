const express = require('express');
const reservationController = require('../controllers/reservation-controller');
const verifyToken = require('../middleware/auth-middleware');

const reservationRouter = express.Router();

reservationRouter.use(verifyToken);
reservationRouter.get('/', reservationController.get);
reservationRouter.get('/:id', reservationController.findById);
reservationRouter.post('/', reservationController.create);
reservationRouter.post('/:id/payment', reservationController.payment);

module.exports = reservationRouter;
