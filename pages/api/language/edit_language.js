import db from "@/db";

export default async function handler(req, res) {
    let id = req.body.id;
    try {
        await db('tbl_language')
            .where('language_id', '=', id)
            .update({
                language_name: req.body.language_name,
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
