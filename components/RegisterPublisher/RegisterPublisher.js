import { Inter } from '@next/font/google'
import styles from './RegisterPublisher.module.css'
import Link from 'next/link'
import Form from '../Form/Form'
import { useRef } from 'react'
import { useRouter } from 'next/router';

let registerForm = {
    apiRoute: '/api/RegisterPublisher/RegisterPublisher',
    submitButtonText: "Register",
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "publisher_name": {
            type: "text",
            label: "Name",
            required: true,
            minLength: 5,
            maxLength: 15,
        },
        "password": {
            type: "password",
            label: "Password",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "confirm_password": {
            type: "password",
            label: "Confirm Password",
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
                <h1>Publisher Register</h1>
                <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
            </div>
        </>
    )
}
