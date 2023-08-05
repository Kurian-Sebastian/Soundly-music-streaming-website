import React from 'react'
import styles from './Header.module.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '../Login/Login'
import RegisterArtist from '../RegisterArtist/RegisterArtist'
import RegisterPublisher from '../RegisterPublisher/RegisterPublisher'
import RegisterCustomer from '../RegisterCustomer/RegisterCustomer'


export default function Header() {
  return (
    <div class={styles.header}>
            <div class={styles.nav}>
                <h1>Soundly</h1>
                <div class={styles.insidenav}>
                    {/* <Link to="/HomePage">Home</Link> */}
                    <Link to="/Login">Login</Link>
                    <div class={styles.dropdown}>
                        <button class={styles.dropbtn}>Register</button>
                        <div class="dropdown-content">
                          <Link to="/PublisherRegister">Publisher</Link>
                          <Link to="/RegisterArtist">Artist</Link>
                          <Link to="/RegisterCustomer">Customer</Link>
                        </div>
                      </div>
                </div>
            </div>
        </div>
  );
}
