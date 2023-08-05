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
    let artist_name = data.fields.artist_name[0];
    let artist_phone = data.fields.artist_phone[0];

    try {
        await db('tbl_artist')
            .where('email', '=', email)
            .update({
                    artist_name: artist_name,
                    artist_phone: artist_phone,
                    artist_image: file,
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export default handler;
