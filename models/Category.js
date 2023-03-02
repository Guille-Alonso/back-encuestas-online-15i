const {Schema,model} = require('mongoose');

const CategorySchema = new Schema({
    name:{
        type: String,
        required: [true,"nombre obligatorio"],
        trim: true,
        unique:[true, 'ya existe una categoría con ese nombre']
    },
    state:{
        type: Boolean,
        default: true
    }
  
},
{
    versionKey : false,
    timestamps: false
})

module.exports = model('Category',CategorySchema)