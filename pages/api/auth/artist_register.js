import multiparty from "multiparty";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import db from '@/db';
import Cookies from 'cookies'


// Disable NextJS body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler
const handler = async (req,res) => {
  const form = new multiparty.Form({autoFiles: true});
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

    let file = fs.readFileSync(data.files.file[0].path).toString('base64');
    let email = data.fields.email[0];
    let password = data.fields.password[0];
    let confirm_password = data.fields.confirm_password[0];
    let artist_name = data.fields.artist_name[0];
    let artist_phone = data.fields.artist_phone[0];


    const cookies = new Cookies(req, res);

    let user_email = await db.select("email").from("tbl_login").where("email", '=', email).first();

    if (password != confirm_password) {
        return res.status(400).json({ errors: { password: "password no match", confirm_password: "passwrod no match" } });
    }
    else if (user_email) {
        return res.status(400).json({ errors: { email: "email already used" } });
    } else {
        try {
            await db('tbl_login').insert(
                {
                    email: email,
                    password: password,
                    type: "artist"
                }
            );
            await db('tbl_artist').insert(
                {
                    email: email,
                    artist_name: artist_name,
                    artist_phone: artist_phone,
                    artist_image: file,
                }
            );

            await db('tbl_playlist_master').insert(
                [
                    {
                        playlist_name: "Favorites",
                        email: email,
                    },
                    {
                        playlist_name: "deleted-children",
                        email: email,
                        playlist_status: 0
                    }
                ]
            );

            let artist = await db.select("*").from("tbl_artist").where("email", '=', email).first();

            let token = jwt.sign(
                {
                    email: email,
                    type: "artist",
                    artist_id: artist.artist_id
                },
                process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });

            cookies.set('jwttoken', token, {
                httponly: true,
            })

            res.status(200).json({ message: "sucessfully registered", user: { email: email, type: "artist", artist_id: artist.artist_id } });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal server error" });
        }

    }
}

export default handler;
