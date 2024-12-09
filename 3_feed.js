const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.get("/user/tweets/feed/",token_verify,async (req,res)=>{
    
    
    try{

    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})