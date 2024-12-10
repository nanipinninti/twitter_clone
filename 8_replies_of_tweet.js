const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.get("/tweets/:tweet_id/replies/",token_verify,async (req,res)=>{
    const {tweet_id} = req.params
    const {user_id,username} = req.user
    try{
        const query = `select  u.name,r.reply as reply from 
            "Follower" f
            INNER JOIN "Tweet" t on f.following_user_id = t.user_id
            LEFT JOIN "Reply" r on r.tweet_id = t.tweet_id
			INNER JOIN "User" u on u.user_id = r.user_id			
                where f.follower_user_id = $1 and t.tweet_id = $2`
        console.log(user_id,tweet_id)
        const values = [user_id,tweet_id]
        const result = await db.query(query,values)
        // if (result.rowCount>0)
        return res.status(200).json({replies : result.rows.map(obj=>({name : obj.name,reply : obj.reply}))})
        // else
        //     return res.status(401).json({message : "Invalid request"})
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})