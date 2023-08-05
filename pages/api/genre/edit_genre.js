import db from "@/db";

export default async function handler(req, res) {
    let id = req.body.id;
    try {
        await db('tbl_genre')
            .where('genre_id', '=', id)
            .update({
                genre_name: req.body.genre_name,
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
