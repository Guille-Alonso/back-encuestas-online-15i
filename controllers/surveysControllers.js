const Survey = require("../models/Survey");
const CustomError = require("../utils/customError");

const getSurveys = async (req, res) => {
    try {
     if(req.params.id){
      const survey = await Survey.findOne({_id:req.params.id}).populate("categoria");
      if(!survey) throw new CustomError("Encuesta no encontrada",404)
      res.status(200).json({survey});
     }
     else{
      const surveys = await Survey.find().populate("categoria");
      res.status(200).json({surveys});
     } 
    
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
      };
    }

    const deleteSurvey = async (req, res) => {
        try {
          const { id } = req.body;
          const surveyRemoved = await Survey.findByIdAndDelete(id);
          if (!surveyRemoved) throw new CustomError("Encuesta no encontrada", 404);
          res.status(200).json({ message: "La encuesta a sido borrada" });
        } catch (error) {
          res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
        }
      };
      
      
      const editSurvey = async(req,res) =>{
        try {
            const {id,campos}= req.body;

            const encuestaModificada = await Survey.findByIdAndUpdate(id,campos,{new:true})
            if(!encuestaModificada) throw new CustomError("encuesta no encontrada",404)
            res.status(200).json({message:"encuesta modificada con exito",encuestaModificada})
        } catch (error) {
            res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
        }
      }

      const editResponsesSurvey = async (req,res)=>{
       
        try {
          const {id,valores}= req.body;

          const encuestaAModificar = await Survey.findById(id);
          if(!encuestaAModificar) throw new CustomError("encuesta no encontrada",404)

          if(encuestaAModificar.unaRespuestaPorPersona){
            for (let index = 0; index < encuestaAModificar.respuesta.length; index++) {
                if(encuestaAModificar.respuesta[index].email==valores.email)
                throw new CustomError("el usuario ya respondió a esta encuesta",404)
             }
          }
     
          const encuestaModificada = await Survey.findByIdAndUpdate(id, {
            respuesta: [...encuestaAModificar.respuesta, valores],
          });

          if(!encuestaModificada) throw new CustomError("encuesta no encontrada",404)
          res.status(200).json({message:"encuesta modificada con exito",encuestaModificada})

        } catch (error) {
          res
          .status(error.code || 500)
          .json({ message: error.message || "algo explotó :|" });
        }
      }
      
      const addSurvey = async (req, res) => {
        try {
          const { name, estado, pregunta,user, categoria,unaRespuestaPorPersona } = req.body;
          const newSurvey = new Survey({
            name,
            estado,
            pregunta,
            user,
            categoria,
            unaRespuestaPorPersona
          });
          await newSurvey.save();
          res.status(201).json({ message: "Se agregó una nueva encuesta con éxito" });
        } catch (error) {
          res.status(error.code || 500).json({
            message:
              error.message || "Ups! Hubo un problema, por favor intenta más tarde",
          });
        }
      };
      
    module.exports ={
        addSurvey,
        getSurveys,
        deleteSurvey,
        editSurvey,
        editResponsesSurvey
    }