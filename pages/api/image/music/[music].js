import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.music;
    let data = await db.select().from("tbl_music").where('music_id', '=', id).first();
    let file = Buffer.from(data.music_image.toString(), 'base64')
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(file)
}

export const config = {
  api: {
    responseLimit: false,
  },
}
