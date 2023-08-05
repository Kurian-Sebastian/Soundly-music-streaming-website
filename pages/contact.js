import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

export default function Home() {

    let [users, setUsers] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await fetch("/api/test/select");
            let data = await res.json();
            setUsers(data);
        })();
    }, []);

    return (
        <>
            <Link href="/">Go to home</Link>

            <br />

            {
                users ?
                    <table border="1">{
                        users.map(user => (
                            <tr>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                {user.status == 1 ?
                                    <td>active</td> :
                                    <td>inactive</td>}
                                <td>{user.password}</td>
                            </tr>
                        ))
                    }</table>
                    :
                    <CircularProgress />
            }
            <h1>Contact</h1>
        </>
    )
}
