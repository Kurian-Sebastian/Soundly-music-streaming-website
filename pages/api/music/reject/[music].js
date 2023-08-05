import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.music;
    try {
        await db('tbl_music')
            .where('music_id', '=', id)
            .update({
                music_status: "rejected",
            });
        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
