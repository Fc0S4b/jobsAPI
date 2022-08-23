const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  // nunca guardar passwords como string en base de datos, debes hashearlas, usa la librería bcryptjs
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10); //random bytes que se agregan a la contraseña
  const hashedPassword = await bcrypt.hash(password, salt); //hasheamos la passowrd

  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
