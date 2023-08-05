import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    console.log(context.params);

    let customer = await db.select("*")
        .from("tbl_customer")
        .innerJoin("tbl_login", "tbl_customer.email", "tbl_login.email")
        .where('customer_id', '=', context.params.edit).first();

    customer = JSON.parse(JSON.stringify(customer));

    return {
        props: { customer }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {

    let customerForm = {
        apiRoute: '/api/customer/customer_edit/',
        submitButtonText: "Edit",
        inputs: {
            "email": {
                type: "email",
                label: "Email",
                value: props.customer.email,
                disabled: true,
                required: true,
                minLength: 5,
                maxLength: 25,
            },
            "customer_name": {
                type: "text",
                label: "Name",
                value: props.customer.customer_name,
                required: true,
                minLength: 5,
                maxLength: 15,
            },
            "customer_phone": {
                type: "text",
                datatype: "number",
                value: props.customer.customer_phone,
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
            <h1>Edit Customer</h1>
            <Form ref={ref} formDetails={customerForm} onResponse={()=>router.back()} />
        </AdminLayout>
    );
}
