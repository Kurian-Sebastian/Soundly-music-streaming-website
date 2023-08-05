import jwt from 'jsonwebtoken';
import Cookies from 'cookies'
import { useRouter } from 'next/router';

function auth(req) {
    const cookies = new Cookies(req);
    var user = cookies.get('jwttoken')
    if(user){
        user = jwt.verify(user, process.env.JWT_SECRET);
        req.user = user;
    }
}

async function request(url,body){
    let rawResponse;
    let data;
    if(body){
        rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        data = await rawResponse.json();
    } else {
        rawResponse = await fetch(url);
        data = await rawResponse.json();
    }
    return [ rawResponse, data];
}

async function requestWithAuth(router,url,body){
    let rawResponse;
    let data;
    if(body){
        rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        data = await rawResponse.json();
    } else {
        rawResponse = await fetch(url);
        data = await rawResponse.json();
    }
    if(rawResponse.status == 401){
        router.replace("/login");
    }
    return [ rawResponse, data];
}
export { auth,request,requestWithAuth };
