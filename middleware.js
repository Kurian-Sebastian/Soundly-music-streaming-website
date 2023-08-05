import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'


let urlPermissions = {
    "artist": [
        "/api/auth/logout",
        "/api/playlist/",
        "/api/playlist/add_to_playlist",
        "/api/auth/user"
    ],
    "publisher": [
        "/api/auth/logout",
        "/api/auth/user"
    ],
    "customer": [
        "/api/auth/logout",
        "/api/playlist/",
        "/api/playlist/add_to_playlist",
        "/api/auth/user"
    ],
    "admin": [
        "/api/auth/logout",
        "/api/auth/user"
    ],
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export function middleware(request) {

    let allUrls = [];
    Object.values(urlPermissions).forEach(urlArray => {
        urlArray.forEach(url => {
            allUrls.push(url);
        });
    });
    if (allUrls.includes(request.nextUrl.pathname)) {
        if (request.cookies.get("jwttoken") && request.cookies.get("jwttoken").value) {
            try {
                let user = parseJwt(request.cookies.get("jwttoken").value);
                let urls = urlPermissions[user.type];
                if (!urls.includes(request.nextUrl.pathname)) {

                    return NextResponse.rewrite(new URL("/login", request.url), { status: 401 });
                }
            } catch (err) {
                console.log(err);
                return NextResponse.rewrite(new URL("/login", request.url), { status: 401 });
            }
        } else {
            return NextResponse.rewrite(new URL("/login", request.url), { status: 401 });
        }
    }

}
