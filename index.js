// Import packages
const express = require('express');
const activityRouter = require('./routes/activity-routes');
const userRouter = require('./routes/user-routes');
const reservationRouter = require('./routes/reservation-routes');
const cors = require('cors');
const connectDB = require('./database');

// Middlewares
const app = express();
connectDB();

// Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Merhaba, Restful API!');
});

app.use('/user', userRouter);
app.use('/activities', activityRouter);
app.use('/reservation', reservationRouter);

// connection
const port = process.env.PORT || 9003;
app.listen(port, () => console.log(`Listening to port ${port}`));
console.log(`Server is running on port ${port}`);
