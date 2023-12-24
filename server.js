const express = require('express');
const activityRouter = require('./routes/activity-routes');
const userRouter = require('./routes/user-routes');
const reservationRouter = require('./routes/reservation-routes');
const cors = require('cors');
const app = express();

const connectDB = require('./database');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Merhaba, Restful API!');
});

app.use('/activities', activityRouter);
app.use('/user', userRouter);
app.use('/reservation', reservationRouter);

const server = app.listen(process.env.PORT || 9001);
const portNumber = server.address().port;
console.log(`Server is running on port ${portNumber}`);
