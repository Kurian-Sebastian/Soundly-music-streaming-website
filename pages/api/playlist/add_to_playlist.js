import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {

        let child = await db.select().from("tbl_playlist_child")
            .where('playlist_master_id','=',req.body.playlist_master_id)
            .andWhere('music_id','=',req.body.music_id).first();

        if(!child){
            await db('tbl_playlist_child').insert(
                {
                    playlist_master_id: req.body.playlist_master_id,
                    music_id: req.body.music_id,
                }
            );
        }

        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
