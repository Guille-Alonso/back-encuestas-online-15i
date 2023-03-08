const User = require("../models/User");

const checkIfUserExists = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("El usuario no existe", 404);
};

const checkIfEmailExists = async (email) => {
 
  const user = await User.findOne({email});
  if (user) throw new Error("El correo ya se encuentra registrado", 404);
};

module.exports = { checkIfUserExists , checkIfEmailExists};
