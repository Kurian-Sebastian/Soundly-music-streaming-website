import db from "@/db";

export default async function handler(req, res) {
    let id = req.body.email;
    try {
        await db('tbl_publisher')
            .where('email', '=', id)
            .update({
                publisher_name: req.body.publisher_name,
                publisher_phone: req.body.publisher_phone,
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
