import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        let follow = await db.select().from("tbl_follower")
            .where('artist_id', '=', req.body.artist_id)
            .andWhere('email', '=', req.user.email).first();

        if (!follow) {
            await db('tbl_follower').insert(
                {
                    artist_id: req.body.artist_id,
                    email: req.user.email
                }
            );
        } else{
            if (follow.follow_status == 1){
                await db('tbl_follower')
                    .where('artist_id', '=', req.body.artist_id)
                    .andWhere('email', '=', req.user.email)
                    .update(
                        {
                            follow_status: 0 
                        }
                    );
            } else {
                await db('tbl_follower')
                    .where('artist_id', '=', req.body.artist_id)
                    .andWhere('email', '=', req.user.email)
                    .update(
                        {
                            follow_status: 1
                        }
                );
            }
        }
        res.status(200).json({ message: "Sucessfully inserted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
