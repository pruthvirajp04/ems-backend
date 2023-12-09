const express = require("express")
// const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/yourDatabaseName")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    loginId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("users",newSchema)

app.post("/api/login/",async(req,res)=>{
    const{loginweb,passweb}=req.body
	console.log(loginweb,passweb);
    try{
      
      
        const check=await collection.find()
        // console.log(check);

        check.forEach((doc) => {
            if (doc.loginId === loginweb && doc.password === passweb) {
              console.log("Success");
            }
          });
     

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(5000,()=>{
    console.log("port connected");
})

