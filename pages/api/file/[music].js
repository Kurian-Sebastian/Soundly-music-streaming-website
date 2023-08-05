import db from "@/db";

export default async function handler(req, res) {
    let id = req.query.music;
    let data = await db.select().from("tbl_music").where('music_id', '=', id).first();
    let file = Buffer.from(data.music_file.toString(), 'base64')
    res.setHeader('Content-Type', 'audio/mpeg3');
    res.setHeader('Content-Disposition','filename="music.mp3"');
    res.setHeader('Accept-Ranges','bytes');
    res.send(file)
}
