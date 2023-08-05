import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.music;
    let music_data = await db.select().from("tbl_music").where('music_id', '=', id).first();
    let payment_data = await db.select().from("tbl_payment").where('music_id', '=', id).first();
    try {
        if (music_data.music_status == "deleted") {
            if (music_data.music_price == 0) {
                await db('tbl_music')
                    .where('music_id', '=', id)
                    .update({
                        music_status: "waiting",
                    });
            } else if (payment_data) {
                await db('tbl_music')
                    .where('music_id', '=', id)
                    .update({
                        music_status: "paid",
                    });
            } else if (music_data.music_price > 0) {
                await db('tbl_music')
                    .where('music_id', '=', id)
                    .update({
                        music_status: "approved",
                    });
            }
        } else {
            await db('tbl_music')
                .where('music_id', '=', id)
                .update({
                    music_status: "deleted",
                });
        }

        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
