import db from "@/db"

export default async function handler(req, res) {
  let users = await db.select().from("tbl_login").where("type",'=',"customer").andWhere("status","=",1)
  if(users.length){
    res.status(200).json(users);
  } else {
    res.status(404).json(users);
  }
}
