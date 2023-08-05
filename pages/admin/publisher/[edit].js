import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    console.log(context.params);

    let publisher = await db.select("*")
        .from("tbl_publisher")
        .innerJoin("tbl_login", "tbl_publisher.email", "tbl_login.email")
        .where('publisher_id', '=', context.params.edit).first();

    publisher = JSON.parse(JSON.stringify(publisher));

    return {
        props: { publisher }, // will be passed to the page component as props
    }
}

export default function AdminPublisherEdit(props) {

    let customerForm = {
        apiRoute: '/api/publisher/publisher_edit/',
        submitButtonText: "Edit",
        inputs: {
            "email": {
                type: "email",
                label: "Email",
                value: props.publisher.email,
                disabled: true,
                required: true,
                minLength: 5,
                maxLength: 25,
            },
            "publisher_name": {
                type: "text",
                label: "Name",
                value: props.publisher.publisher_name,
                required: true,
                minLength: 5,
                maxLength: 15,
            },
            "publisher_phone": {
                type: "text",
                datatype: "number",
                value: props.publisher.publisher_phone,
                label: "Phone",
                required: true,
                minLength: 7,
                maxLength: 10,
            },
        }
    }

    let ref = useRef();

    const router = useRouter();

    return (
        <AdminLayout>
            <h1>Edit Publisher</h1>
            <Form ref={ref} formDetails={customerForm} onResponse={()=>router.back()} />
        </AdminLayout>
    );
}
