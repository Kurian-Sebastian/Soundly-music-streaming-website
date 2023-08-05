import db from "@/db";

export default async function handler(req, res) {
    let id = req.body.id;
    try {
        await db('tbl_music')
            .where('music_id', '=', id)
            .update({
                music_price: req.body.music_price,
                music_status: "approved",
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
