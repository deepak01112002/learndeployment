const express = require("express")
const connection = require("./db")
const UserRoute = require("./Routes/user.route")
const NoteRoute = require("./Routes/Notes.route")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Homepage")
})
app.use("/user",UserRoute)
app.use("/note",NoteRoute)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connection done at port")
    } catch (error) {
        console.log(error)
    }
})