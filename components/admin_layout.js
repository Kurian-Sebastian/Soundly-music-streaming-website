import { useEffect, useState, useRef, useContext } from "react";
import UserContext from "@/lib/usercontext";
import Link from 'next/link';

export default function AdminLayout({ children }) {

    const [user, setUser] = useContext(UserContext);

    return (
        <div className="admin-container">
            <div className="admin-nav">
                {user && user.type == "admin" &&
                    <Link href="/admin/customer/view">Customer</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/artist/view">Artist</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/publisher/view">Publisher</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/genre/view">Genres</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/language/view">Languages</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/cards/view">Cards</Link>
                }
                {user && user.type == "admin" &&
                    <Link href="/admin/playlists/view">Playlists</Link>
                }
                {user && user.type == "artist" &&
                    <Link href="/admin/artist/follower">Followers</Link>
                }
                <Link href="/admin/music/view">Music</Link>
            </div>
            <div className="admin-content">
                {children}
            </div>
        </div>

    );

}
