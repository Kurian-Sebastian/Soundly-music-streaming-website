import db from "@/db";

export default async function handler(req, res) {
    let id = req.body.email;
    try {
        await db('tbl_customer')
            .where('email', '=', id)
            .update({
                customer_name: req.body.customer_name,
                customer_phone: req.body.customer_phone,
            })
        res.status(200).json({ message: "Sucessfully edited!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
