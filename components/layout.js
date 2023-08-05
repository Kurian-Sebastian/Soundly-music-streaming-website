import { useEffect, useState, useRef, useContext } from "react";
import styles from '@/styles/Layout.module.css'
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import UserContext from "@/lib/usercontext";
import Tooltip from '@mui/material/Tooltip';
import Player from "./Player/Player";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { useRouter } from "next/router";
import SearchContext from "@/lib/search";
import Head from "next/head";


export default function Layout({ children }) {


    const [user, setUser] = useContext(UserContext);
    const [searchBy, search] = useContext(SearchContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [themeAnchorEl, setThemeAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const themeOpen = Boolean(themeAnchorEl);

    const router = useRouter();

    const handleClose = (link) => {
        setAnchorEl(null);
        setThemeAnchorEl(null);
        router.push(link);
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const openThemeMenu = (event) => {
        setThemeAnchorEl(event.currentTarget);
    }

    const home = () => {
        if (user && (user.type == "artist" || user.type == "customer")) {
            router.push("/home");
        } else {
            router.push("/");
        }
    }

    const changeSearch = (event) => {
        search(event.target.value);
        router.push("/explore");
    }

    const changeTheme = (theme) => {
        setThemeAnchorEl(null);
        document.documentElement.setAttribute('data-theme', theme);
    }

    return (
        <>
            <div className={styles.mainroot}>
                <Head>
                    <title>Soundly</title>
                </Head>

                <div className={styles.navbar}>
                    <h1 onClick={home}>Soundly</h1>

                    <input onChange={changeSearch} value={searchBy} placeholder="Search Songs" className={styles.navSearch}>
                    </input>

                    <div>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={openThemeMenu}
                                size="small"
                                sx={{ ml: 2 }}
                            >
                                <DarkModeIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={openMenu}
                                size="small"
                                sx={{ ml: 2 }}
                            >
                                {user && user.type == "artist" ?
                                    <Avatar sx={{ width: 42, height: 42 }} src={"/api/image/artist/" + user.artist_id}></Avatar>
                                    :
                                    <Avatar sx={{ width: 42, height: 42 }}></Avatar>
                                }

                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <main className={styles.content}>
                    {children}
                </main>

                {!router.asPath.startsWith("/admin") &&
                    <Player />
                }

                <Menu
                    anchorEl={themeAnchorEl}
                    open={themeOpen}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => changeTheme("white")}>White</MenuItem>
                    <MenuItem onClick={() => changeTheme("pink")}>Pink</MenuItem>
                </Menu>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {user ?
                        <MenuItem onClick={() => handleClose("/api/auth/logout")}>Logout</MenuItem>
                        :
                        <>
                            <MenuItem onClick={() => handleClose("/login")}>Login</MenuItem>
                            <MenuItem onClick={() => handleClose("/customer_register")}>Customer Register</MenuItem>
                            <MenuItem onClick={() => handleClose("/artist_register")}>Artist Register</MenuItem>
                            <MenuItem onClick={() => handleClose("/publisher_register")}>Publisher Register</MenuItem>
                        </>
                    }
                </Menu>
            </div>
        </>
    )
}
