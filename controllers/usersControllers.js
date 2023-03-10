const User = require("../models/User");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
   if(req.params.email){
    const user = await User.findOne({email:req.params.email});
    if(!user) throw new CustomError("Usuario no encontrado",404)
    res.status(200).json({user});
   }
   else{
    const users = await User.find();
    res.status(200).json({users });
   } 
  
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
    };
  }

  const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const passwordEncrypted = await bcrypt.hash(password, salt);
     
      const newUser = new User({
        name,
        email,
        password: passwordEncrypted,
        admin: false,
      });
      
      const userSaved = await newUser.save();
      res.status(200).json({ message: "Registro correcto", user: userSaved });
    } catch (error) {
      res.status(error.code || 500).json({
        message:
          error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
    }
  };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Ingreso correcto", ok: true, user, token });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemoved = await User.findByIdAndDelete(id);
    if (!userRemoved) throw new CustomError("Usuario no encontrado", 404);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};


const editUser = async(req,res) =>{
  try {
      const {id,campos}= req.body;
      let {password} = campos
  
      let fields;
      if(password){
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(password, salt);
        password = passwordEncrypted;
        fields = {
          ...campos,
          password:passwordEncrypted
        }
      } else fields = campos;
      
      const usuarioModificado = await User.findByIdAndUpdate(id,fields,{new:true})
      if(!usuarioModificado) throw new CustomError("Usuario no encontrado",404)
      res.status(200).json({message:"usuario modificado con exito",usuarioModificado})
  } catch (error) {
      res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const addUser = async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordEncrypted,
      admin
    });
    await newUser.save();
    res.status(201).json({ message: "Se agregó un nuevo usuario con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;
   
    const user = await User.findById(id);
    if (!user) throw new CustomError("Autenticación fallida", 401);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

module.exports = {
  getUsers,
  register,
  getAuthStatus,
  deleteUser,
  login,
  editUser,
  addUser
};
