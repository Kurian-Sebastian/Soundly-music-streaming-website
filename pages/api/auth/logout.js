import Cookies from 'cookies'
export default async function handler(req, res) {
    const cookies = new Cookies(req, res)
    cookies.set('jwttoken', "", {
        maxAge: 0,
    })
    res.status(200).json({ message: "Logout Successful" });
}
