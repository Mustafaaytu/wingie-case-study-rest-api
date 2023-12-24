const Activity = require('../models/activity');

const get = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const findById = async (req, res) => {
  try {
    const {id} = req.params;
    const activity = await Activity.findById(id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const create = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const update = async (req, res) => {
  try {
    const {id} = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body);
    // we cannot find any activity in database
    if (!activity) {
      return res
        .status(404)
        .json({message: `cannot find any activity with ID ${id}`});
    }
    const updatedActivity = await Activity.findById(id);
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const deleteById = async (req, res) => {
  try {
    const {id} = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res
        .status(404)
        .json({message: `cannot find any activity with ID ${id}`});
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  get,
  findById,
  create,
  update,
  deleteById,
};
