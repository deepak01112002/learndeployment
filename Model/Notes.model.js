const mongoose = require("mongoose")


const noteSchema = mongoose.Schema({
    title : {type: String, required :true},
    des :  {type: String, required :true},
    author : {type: String, required :true},
    authorID : {type: String, required :true},
    cat : {type: String, required :true}
})

const NoteModel = mongoose.model("note",noteSchema)

module.exports = NoteModel