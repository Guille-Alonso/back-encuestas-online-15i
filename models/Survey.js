const {Schema,model} = require('mongoose');

const SurveySchema = new Schema({
    name:{
        type: String,
        required: [true,"nombre obligatorio"],
        trim: true,
        unique:[true, 'ya existe una encuesta con ese nombre']
    },
    state:{
        type: String,
        enum: ["active", "inactive", "pending"],
    },
    questions:{
        type: Array
    },
    answers:{
        type: Array
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    oneAnswerPerPerson:{
        type:Boolean
    }
  
},
{
    versionKey : false,
    timestamps: true
})

module.exports = model('Survey',SurveySchema)

