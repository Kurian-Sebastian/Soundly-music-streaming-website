import { Inter } from '@next/font/google'
import styles from './Login.module.css'
import Link from 'next/link'
import Form from '../Form/Form'
import { useRef } from 'react'
import { useRouter } from 'next/router';

let registerForm = {
    apiRoute: '/api/Login/Login',
    submitButtonText: "Login",
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "password": {
            type: "password",
            label: "Password",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
    }
}

export default function Home() {

    let ref = useRef();
    const router = useRouter();

    let handleResponse = (values) => {
        router.push("/contact");
    }

    return (
        <>
            {/* <Link href="/contact">Go to contact</Link> */}
            <br />
            <div className={styles.main_component}>
                <h1>Login</h1>
                <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
            </div>
        </>
    )
}
