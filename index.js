const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const port = 3000
 

app.use(cors())
app.use(express.json())

const URL = "mongodb+srv://kumararyanbhai90:pu5KgQiIroj2eEzW@cluster0.ne6qm.mongodb.net/"


mongoose.connect(URL,).then(()=>console.log("Db Connected")).catch("Error DB")
const ToDoSchema = new mongoose.Schema({
    Text:{
        type:String,
    },
    Date:{
        type:String
    }
})

const ToDo = mongoose.model("ToDo",ToDoSchema)

app.get('/', async(req, res) =>{
    let Data;
    try {
       Data =  await ToDo.find()
    } catch (error) {
        console.log(error)
    }
    res.json(Data)
})
app.post("/", async(req,res)=>{
   let {Text,Date} = req.body;
   res.json({
    text:Text,
    date:Date
   })

   try {
    
    const NedData = new ToDo({
            Text,
            Date
    })
  await NedData.save();
   } catch (error) {
    console.log(error)
   }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))