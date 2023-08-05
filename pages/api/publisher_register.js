import jwt from 'jsonwebtoken';
import db from '@/db';
import Cookies from 'cookies'

export default async function handler(req, res) {
    const cookies = new Cookies(req, res)

    let user_email = await db.select("email").from("tbl_login").where("email", '=', req.body.email);

    if (req.body.password != req.body.confirm_password) {
        return res.status(400).json({ errors: { password: "password no match", confirm_password: "passwrod no match" } });
    }
    else if (user_email.length) {
        return res.status(400).json({ errors: { email: "email already used" } });
    } else {
        try {
            await db('tbl_login').insert(
                {
                    email: req.body.email,
                    password: req.body.password,
                    type: "publisher"
                }
            );
            await db('tbl_publisher').insert(
                {
                    email: req.body.email,
                    publisher_name: req.body.publisher_name,
                    publisher_phone: req.body.publisher_phone,
                }
            );

            let publisher = await db.select("*").from("tbl_publisher").where("email", '=', req.body.email).first();



            let token = jwt.sign(
                {
                    email: req.body.email,
                    type: "publisher",
                    publisher_id: publisher.publisher_id
                },
                process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });

            cookies.set('jwttoken', token, {
                httponly: true,
            })

            res.status(200).json({ message: "sucessfully registered", user: { email: req.body.email, type: "publisher", publisher_id: publisher.publisher_id } });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal server error" });
        }
    }
}
