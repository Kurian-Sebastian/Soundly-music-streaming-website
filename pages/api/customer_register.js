import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '@/db';
import Cookies from 'cookies'


export default async function handler(req, res) {
    const cookies = new Cookies(req, res)
    let user_email = await db.select("email").from("tbl_login").where("email", '=', req.body.email);
    if (req.body.password != req.body.confirm_password) {
        return res.status(400).json({ errors: { password: "Password no match", confirm_password: "Passwrod no match" } });
    }
    else if (user_email.length) {
        return res.status(400).json({ errors: { email: "email already used" } });
    } else {
        try {
            await db('tbl_login').insert(
                {
                    email: req.body.email,
                    password: req.body.password,
                    type: "customer"
                }
            );
            await db('tbl_customer').insert(
                {
                    email: req.body.email,
                    customer_name: req.body.customer_name,
                    customer_phone: req.body.customer_phone,
                }
            );

            await db('tbl_playlist_master').insert(
                [
                    {
                        playlist_name: "Favorites",
                        email: req.body.email,
                    },
                    {
                        playlist_name: "deleted-children",
                        email: req.body.email,
                        playlist_status: 0
                    }
                ]
            );

            let customer = await db.select("*").from("tbl_customer").where("email", '=', req.body.email).first();
            let token = jwt.sign(
                {
                    email: req.body.email,
                    type: "customer",
                    customer_id: customer.customer_id
                }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });

            cookies.set('jwttoken', token, {
                httpOnly: true,
            })
            res.status(200).json({ message: "Sucessfully registered", user: { email: req.body.email, type: "customer", customer_id: customer.customer_id } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server errror" });
        }
    }
}

