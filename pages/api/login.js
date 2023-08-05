import jwt from 'jsonwebtoken';
import db from '@/db';
import Cookies from 'cookies'

export default async function handler(req, res) {
    let user = await db.select().from("tbl_login").where('email', '=', req.body.email).andWhere('status', '=', true).first();
    const cookies = new Cookies(req, res)
    if (!user) {
        return res.status(400).json({ errors: { email: "No Such Account Exists" } });
    } else if (req.body.password != user.password) {
        return res.status(400).json({ errors: { password: "Wrong password" } });
    } else if (user.status == false) {
        return res.status(400).json({ errors: { email: "No Such Account Exists" } });
    } else {
        let token;
        let publisher;
        let customer;
        let artist;
        if (user.type == "admin") {
            token = jwt.sign({ email: user.email, type: user.type }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
        } else if (user.type == "customer") {
            customer = await db.select("*").from("tbl_customer").where("email", '=', req.body.email).first();
            token = jwt.sign({ email: user.email, type: user.type, customer_id: customer.customer_id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
        } else if (user.type == "publisher") {
            publisher = await db.select("*").from("tbl_publisher").where("email", '=', req.body.email).first();
            token = jwt.sign({ email: req.body.email, type: "publisher", publisher_id: publisher.publisher_id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
        } else if (user.type == "artist") {
            artist = await db.select("*").from("tbl_artist").where("email", '=', req.body.email).first();
            token = jwt.sign({ email: req.body.email, type: "artist", artist_id: artist.artist_id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
        }
        cookies.set('jwttoken', token, {
            httpOnly: true,
        })
        if (user.type == "customer") {
            return res.status(200).json({ url: "", "message": "Login Sucessful", user: { email: user.email, type: user.type, customer_id: customer.customer_id } });
        } else if (user.type == "artist") {
            return res.status(200).json({ url: "", "message": "Login Sucessful", user: { email: user.email, type: user.type, artist_id: artist.artist_id } });
        } else if (user.type == "publisher") {
            return res.status(200).json({ url: "", "message": "Login Sucessful", user: { email: user.email, type: user.type, publisher_id: publisher.publisher_id } });
        } else {
            return res.status(200).json({ url: "", "message": "Login Sucessful", user: { email: user.email, type: user.type } });
        }

    }
}
