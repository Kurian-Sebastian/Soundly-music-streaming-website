import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    auth(req)
    let id = req.body.id;

    try {
        let card_id = await db('tbl_card').insert({
            card_name: req.body.card_name,
            card_number: req.body.card_number,
            card_expiry: req.body.card_expiry_year+"-"+req.body.card_expiry_month+"-01",
            artist_id: req.user.artist_id,
        }).returning('card_id')

        card_id = card_id[0];

        await db('tbl_payment').insert({
            card_id: card_id,
            music_id: id
        })

        await db('tbl_music')
            .where('music_id', '=', id)
            .update({
                music_status: "paid",
        });

        res.status(200).json({ message: "Sucessfully edited!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
