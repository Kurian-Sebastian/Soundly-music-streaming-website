import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        let follow = await db.select().from("tbl_follower")
            .where('artist_id', '=', req.body.artist_id)
            .andWhere('email', '=', req.user.email)
            .andWhere('follow_status', '=', 1)
            .first();
        if (follow) {
            res.status(200).json({ isFollowing: true });
        } else {
            res.status(200).json({ isFollowing: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
