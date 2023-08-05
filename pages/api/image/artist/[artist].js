import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.artist;
    let data = await db.select().from("tbl_artist").where('artist_id', '=', id).first();
    let image = Buffer.from(data.artist_image.toString(), 'base64')
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image)
}
