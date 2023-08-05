import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        let master = await db.select().from("tbl_playlist_master")
            .where('playlist_name','=', "Favorites")
            .andWhere('email','=', req.user.email).first();

        let child = await db.select().from("tbl_playlist_child")
            .where('playlist_master_id','=',master.playlist_master_id)
            .andWhere("music_id","=",req.body.music_id).first();

        let likes = await db.select()
            .count({ total: 'music_id' })
            .from("tbl_playlist_child")
            .innerJoin("tbl_playlist_master","tbl_playlist_master.playlist_master_id","tbl_playlist_child.playlist_master_id")
            .andWhere("music_id","=",req.body.music_id)
            .andWhere('playlist_name', '=', "Favorites")
            .andWhere('playlist_status', '=', 1).first();

        if(child){
            res.status(200).json({isFavorite: true, likesCount: likes.total});
        } else {
            res.status(200).json({isFavorite: false, likesCount: likes.total});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
