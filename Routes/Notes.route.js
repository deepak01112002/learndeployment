const express = require("express")

const NoteModel = require("../Model/Notes.model")
const auth = require("../Middleware/auth.middleware")

const NoteRoute = express.Router()

NoteRoute.get("/", auth, async(req,res)=>{
    try{
        const d = await NoteModel.find({authorID :req.body.authorID})
        res.send(d)
    }catch(err){
        res.send('Wrong Crdentials')
    }
})

NoteRoute.post("/addNote",auth,async(req,res)=>{
    try {
        const da = new NoteModel(req.body)
        await da.save()
        res.send("Note is Added")
        
    } catch (error) {
        res.send("Some data not found")
    }   
})

NoteRoute.patch("/edit/:id",auth,async(req,res)=>{
    const {id} = req.params
    const data = await NoteModel.findOne({_id : id})
  try {
    if(req.body.authorID !== data.authorID){
      res.send("You are not eligible to change another note")
    }else{
    await NoteModel.findByIdAndUpdate({_id:id},req.body)
    res.send("Data is Updated")
    }
  } catch (error) {
    res.send("Something Wrong Happens")
  }

})

NoteRoute.delete("/delete/:id",auth,async(req,res)=>{
    const {id} = req.params
    const data = await NoteModel.findOne({_id : id})
    try {
      if(req.body.authorID !== data.authorID){
        res.send("You are not eligible to Delete another note")
      }else{
         await NoteModel.findByIdAndDelete({_id:id})
        res.send("Data is Deleted")
      }
      } catch (error) {
        res.send("Something Wrong Happens")
      }
})

module.exports = NoteRoute
