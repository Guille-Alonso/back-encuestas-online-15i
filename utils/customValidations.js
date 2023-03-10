const User = require("../models/User");
const Survey = require("../models/Survey")
const Category = require("../models/Category")

const checkIfUserExists = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("El usuario no existe", 404);
};

const checkIfCategoryExists = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("La categoría no existe", 404);
};

const checkIfEmailExists = async (email) => {
 
  const user = await User.findOne({email});
  if (user) throw new Error("El correo ya se encuentra registrado", 404);
};

const checkIfNameSurveyExists = async (name) => {

  const survey = await Survey.findOne({name});
  if (survey) throw new Error("Ya existe una encuesta con ese nombre", 404);
};

const checkIfNameCategoryExists = async (name) => {
 
  const category = await Category.findOne({name});
  if (category) throw new Error("Ya existe una categoría con ese nombre", 404);
};

module.exports = { checkIfUserExists , checkIfEmailExists,checkIfNameSurveyExists,checkIfNameCategoryExists,checkIfCategoryExists};
