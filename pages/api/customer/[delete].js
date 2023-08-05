import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.delete;
    let data = await db.select().from("tbl_login").where('email', '=', id).first();
    try {
        await db('tbl_login')
            .where('email', '=', id)
            .update({
                status: !data.status,
            })
        console.log(req.headers.referer);
        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
