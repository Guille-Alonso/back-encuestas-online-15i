const {Schema,model} = require('mongoose');

const SurveySchema = new Schema({
    name:{
        type: String,
        required: [true,"nombre obligatorio"],
        trim: true,
        unique:[true, 'ya existe una encuesta con ese nombre']
    },
    estado:{
        type: String,
        enum: ["activa", "inactiva", "pendiente"],
    },
    pregunta:{
        type: Array
    },
    respuesta:{
        type: Array
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    unaRespuestaPorPersona:{
        type:Boolean
    }
  
},
{
    versionKey : false,
    timestamps: false
})
SurveySchema.methods.toJSON = function () {
    const { user, ...survey } = this.toObject();
    return survey;
  };

module.exports = model('Survey',SurveySchema)

