const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  cardHolder: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationMonth: {
    type: String,
    required: true,
  },
  expirationYear: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
});

// Set toJSON options to transform _id to id
PaymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
