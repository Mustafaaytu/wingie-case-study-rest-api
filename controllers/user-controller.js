const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const {name, email, password} = req.body;
  if (
    !name &&
    name.trim() === '' &&
    !email &&
    email.trim() === '' &&
    !password &&
    password.trim() === ''
  ) {
    return res.status(422).json({message: 'Invalid Inputs'});
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({name, email, password: hashedPassword});
    user = await user.save();
  } catch (err) {
    return res.status(500).json({message: 'Unexpected Error Occured'});
  }
  if (!user) {
    return res.status(500).json({message: 'Unexpected Error Occured'});
  }
  return res.status(201).json({id: user._id});
};

const login = async (req, res, next) => {
  const {email, password} = req.body;
  if (!email && email.trim() === '' && !password && password.trim() === '') {
    return res.status(422).json({message: 'Invalid Inputs'});
  }
  let existingUser;
  try {
    existingUser = await User.findOne({email});
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({message: 'Unable to find user from this ID'});
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({message: 'Incorrect Password'});
  }

  const token = jwt.sign(
    {userId: existingUser._id},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '8h',
    }
  );

  return res.status(200).json({
    message: 'Login Successfull',
    id: existingUser._id,
    token,
    name: existingUser.name,
    email: existingUser.email,
  });
};

module.exports = {
  signup,
  login,
};
