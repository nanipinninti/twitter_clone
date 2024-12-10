const app = require('./intialsetup')
const db  = require("./connection")
const tokenVerification = require('./0_middle_ware');
const { query } = require('express');

app.delete("/tweets/:tweet_id/",tokenVerification,async (req,res)=>{
    const {user_id} = req.user;
    const {tweet_id} = req.params
    try{
        const query1 = `select * from "Tweet"  where 
                                user_id = $1 and tweet_id = $2`
        const value1 = [user_id,tweet_id]
        const result1 = await db.query(query1,value1)
        if (result1.rowCount!=0){
            const deleteQuery =  `DELETE FROM "Tweet" WHERE user_id = $1 and tweet_id = $2`
            await db.query(deleteQuery,[user_id,tweet_id])
            return res.status(200).json({message : "Tweet Removed"})
        }
        else{
            return res.status(401).json({message : "Invalid request"})
        }
    }catch(error){
        console.error(error)
        return res.status(400).json({message: "Servor error"})
    }
})