const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:[true,'Please add a task']
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completed:{
        type:Boolean,
        default:false,
    }
},{timestamps:true} )

module.exports = mongoose.model('toDo',toDoSchema)