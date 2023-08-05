import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        let master = await db.select().from("tbl_playlist_master")
            .where('playlist_name', '=', "Favorites")
            .andWhere('email', '=', req.user.email).first();

        let del_master = await db.select().from("tbl_playlist_master")
            .where('playlist_name', '=', "deleted-children")
            .andWhere('email', '=', req.user.email).first();

        let child = await db.select().from("tbl_playlist_child")
            .where(wh=> {
                wh.where('playlist_master_id', '=', master.playlist_master_id)
                wh.orWhere('playlist_master_id', '=', del_master.playlist_master_id)
            })
            .andWhere('music_id', '=', req.body.music_id).first();

        if (!child) {
            await db('tbl_playlist_child').insert(
                {
                    playlist_master_id: master.playlist_master_id,
                    music_id: req.body.music_id,
                }
            );
        } else {
            if (child.playlist_master_id == master.playlist_master_id) {
                await db('tbl_playlist_child')
                    .where('playlist_master_id', '=', master.playlist_master_id)
                    .andWhere('music_id', '=', req.body.music_id)
                    .update(
                        {
                            playlist_master_id: del_master.playlist_master_id,
                        }
                    );
            } else {
                await db('tbl_playlist_child')
                    .where('playlist_master_id', '=', del_master.playlist_master_id)
                    .andWhere('music_id', '=', req.body.music_id)
                    .update(
                        {
                            playlist_master_id: master.playlist_master_id,
                        }
                    );
            }
        }

        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
