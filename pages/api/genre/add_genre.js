import db from "@/db";

export default async function handler(req, res) {
    try {
        await db('tbl_genre').insert(
            {
                genre_name: req.body.genre_name
            }
        );
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
