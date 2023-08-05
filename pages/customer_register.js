import Form from '@/components/Form/Form';
import { useRef } from 'react'
import { useRouter } from 'next/router';

let registerForm = {
    apiRoute: '/api/customer_register/',
    submitButtonText: "Register",
    buttonFullWidth: true,
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            required: true,
            width: '100%',
            minLength: 5,
            maxLength: 50,
        },
        "customer_name": {
            type: "text",
            label: "Name",
            width: '100%',
            required: true,
            minLength: 5,
            maxLength: 25,
        },
        "password": {
            type: "password",
            label: "Password",
            required: true,
            minLength: 5,
            maxLength: 50,
            width: '100%',
        },
        "confirm_password": {
            type: "password",
            label: "Confirm Password",
            required: true,
            minLength: 5,
            width: '100%',
            maxLength: 50,
        },
        // "customer_gender": {
        //     type: "select",
        //     datatype: "number",
        //     label: "Gender",
        //     value: "male",
        //     selectValues: [
        //         { label: "Male", value: "male" },
        //         { label: "female", value: "female" },
        //     ],
        //     required: true,
        // },
        "customer_phone": {
            type: "text",
            width: '100%',
            datatype: "number",
            label: "Phone",
            required: true,
            minLength: 7,
            maxLength: 10,
        },
    }
}

export default function CustomerRegister() {

    let ref = useRef();
    const router = useRouter();

    let handleResponse = (values) => {
        router.push("/home");
    }

    return (
        <div className="auth-page">
            <div class="auth-floater">
            <h1>Register as Customer</h1>
            <br/>
            <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
            </div>
        </div>
    )
}
