import db from "@/db"


export default async function handler(req, res) {

    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.customer_name);
    console.log(req.body.customer_gender);
    console.log(req.body.customer_phone);

    try {
        await db('tbl_login').insert({ email: req.body.email, password: req.body.email, type: "customer" });
        return res.status(200).json({ message: "suceesfully inserted" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server errror" });
        //return res.json(400, { errors: { email: "No Such Account Exists" } });
    }
}
