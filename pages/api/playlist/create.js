import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req);
    try {
        await db('tbl_playlist_master').insert(
            {
                playlist_name: req.body.playlist_name,
                email: req.user.email
            }
        );

        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
