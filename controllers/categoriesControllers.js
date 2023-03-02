const Category = require("../models/Category");
const CustomError = require("../utils/customError");

const getCategories = async (req, res) => {
    try {
     if(req.params.id){
      const category = await Category.findById(req.params.id);
      if(!category) throw new CustomError("Categoría no encontrada",404)
      res.status(200).json({category});
     }
     else{
      const categories = await Category.find();
      res.status(200).json({categories});
     } 
    
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
      };
    }

    const deleteCategory = async (req, res) => {
        try {
          const { id } = req.body;
          const categoryRemoved = await Category.findByIdAndDelete(id);
          if (!categoryRemoved) throw new CustomError("categoría no encontrada", 404);
          res.status(200).json({ message: "La categoría ha sido eliminada"});
        } catch (error) {
          res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
        }
      };
      
      
      const editCategory = async(req,res) =>{
        try {
            const {id,campos}= req.body;
            const categoriaModificada = await Category.findOneAndUpdate({id:id},campos,{new:true})
            if(!categoriaModificada) throw new CustomError("categoría no encontrada",404)
            res.status(200).json({message:"categoría modificada con exito",categoriaModificada})
        } catch (error) {
            res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
        }
      }

      const addCategory = async (req, res) => {
        try {
          const { name, state } = req.body;
          const newCategory = new Category({
            name,
           state
          });
          await newCategory.save();
          res.status(201).json({ message: "Se agregó la nueva categoría con éxito" });
        } catch (error) {
          res.status(error.code || 500).json({
            message:
              error.message || "Ups! Hubo un problema, por favor intenta más tarde",
          });
        }
      };

      
module.exports = {
    getCategories,
    deleteCategory,
    editCategory,
    addCategory
  };
  