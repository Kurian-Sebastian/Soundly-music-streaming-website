import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.delete;
    let data = await db.select().from("tbl_genre").where('genre_id', '=', id).first();
    try {
        await db('tbl_genre')
            .where('genre_id', '=', id)
            .update({
                genre_status: !data.genre_status,
            })
        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
