const app = require('./intialsetup')
const db  = require("./connection")
const tokenVerification = require('./0_middle_ware')

app.get("/user/tweets/",tokenVerification,async (req,res)=>{
    const {user_id} = req.user;
    console.log(user_id)
    try{
        const query = `select t.tweet,count(distinct l.like_id) as likes,
            count(distinct r.reply_id) as replies, t.date_time from 
            "User" u
            INNER JOIN "Tweet" t on u.user_id = t.user_id
            LEFT JOIN "Like" l on l.tweet_id = t.tweet_id
            LEFT JOIN "Reply" r on r.tweet_id = t.tweet_id
            where u.user_id = $1
            group by t.tweet,t.date_time`
        const value = [user_id]
        const result = await db.query(query,value)
        return res.status(200).json(result.rows)
    }catch(error){
        console.error(error)
        return res.status(400).json({message: "Servor error"})
    }
})