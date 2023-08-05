import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {

        let del_master = await db.select().from("tbl_playlist_master")
            .where('playlist_name', '=', "deleted-children")
            .andWhere('email', '=', req.user.email).first();

        if(del_master){
            await db('tbl_playlist_child')
                .where('playlist_child_id', '=', req.body.playlist_child_id)
                .update(
                    {
                        playlist_master_id: del_master.playlist_master_id,
                    }
                );
        }

        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
