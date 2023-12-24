const express = require('express');
const activityController = require('../controllers/activity-controller');
const verifyToken = require('../middleware/auth-middleware');

const activityRouter = express.Router();

activityRouter.use(verifyToken);
activityRouter.get('/', activityController.get);
activityRouter.get('/:id', activityController.findById);
activityRouter.post('/', activityController.create);
activityRouter.put('/:id', activityController.update);
activityRouter.delete('/:id', activityController.deleteById);

module.exports = activityRouter;
