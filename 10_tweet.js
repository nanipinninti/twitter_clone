const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.post("/user/tweets/",token_verify,async (req,res)=>{
    const {tweet} = req.body;
    const {user_id} = req.user;
    try{
        const current_time = new Date();
        const query = `insert into "Tweet"(tweet,user_id,date_time) values($1,$2,$3)`
        const values = [tweet,user_id,current_time]
        const result = await db.query(query,values)
        return res.status(200).json({message : "Created a Tweet"})
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})