import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import { useRef } from "react";

let registerForm = {
    apiRoute: '/api/genre/add_genre',
    submitButtonText: "Add",
    inputs: {
        "genre_name": {
            type: "text",
            label: "Name",
            required: true,
            minLength: 3,
            maxLength: 15,
        }
    }
}

export default function AdminCustomerView(props) {

    let ref = useRef();
    const router = useRouter();

    let handleResponse = (values) => {
        router.back();
    }

    return (
        <AdminLayout>
            <h1>Add Genre</h1>
            <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
        </AdminLayout>
    );
}
