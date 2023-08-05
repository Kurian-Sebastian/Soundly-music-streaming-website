import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        let playlists = await db.select().from("tbl_playlist_master")
            .where("playlist_status","=",1)
            .andWhere("email","=",req.user.email)

        res.status(200).json(playlists);
    } catch (error) {
        //console.log(error);
        //res.status(500).json({ message: "Internal Server Error" });
    }
}
