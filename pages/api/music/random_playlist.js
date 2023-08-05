import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    try {
            // TODO select only the required feilds
        let musics = await db.select().from("tbl_music")
        .innerJoin("tbl_artist", "tbl_artist.artist_id", "tbl_music.artist_id")
        .innerJoin("tbl_genre", "tbl_music.genre_id", "tbl_genre.genre_id")
        .innerJoin("tbl_language", "tbl_music.language_id", "tbl_language.language_id")
        .where("music_status","=","paid")
        .orderBy(db.raw('rand()'));

        musics = musics.map(music => {
            delete music.music_file;
            delete music.music_image;
            delete music.artist_image;
            return music
        });

        res.status(200).json(musics);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
