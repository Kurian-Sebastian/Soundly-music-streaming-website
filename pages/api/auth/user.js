import db from "@/db";
import { auth } from "@/lib/random_functions";

export default async function handler(req, res) {
    try {
        auth(req)
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "NOT AUTHENTICATED" });
    }
}
