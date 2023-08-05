import multiparty from "multiparty";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import db from '@/db';
import Cookies from 'cookies'
import { auth } from "@/lib/random_functions";

// Disable NextJS body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

// Handler
const handler = async (req, res) => {

    auth(req);

    const form = new multiparty.Form({ autoFiles: true });
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function(err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });

    let music_file = fs.readFileSync(data.files.music_file[0].path).toString('base64');
    let image_file = fs.readFileSync(data.files.music_image[0].path).toString('base64');


    let music_name = data.fields.music_name[0];
    let genre_id = data.fields.genre_id[0];
    let language_id = data.fields.language_id[0];
    let publisher_id = data.fields.publisher_id[0];
    let music_id = data.fields.music_id[0];

    try {
        await db('tbl_music')
            .where('music_id', '=', music_id)
            .update({
                music_file: music_file,
                music_image: image_file,
                music_name: music_name,
                language_id: language_id,
                genre_id: genre_id,
                publisher_id: publisher_id,
            })
        res.status(200).json({ message: "sucessfully registered" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }

}

export default handler;
