import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    let language = await db.select("*")
        .from("tbl_language")
        .where('language_id', '=', context.params.edit).first();

    language = JSON.parse(JSON.stringify(language));

    return {
        props: { language }, // will be passed to the page component as props
    }
}

export default function AdminArtistEdit(props) {

    let registerForm = {
        apiRoute: '/api/language/edit_language',
        submitButtonText: "Update",
        id: props.language.language_id,
        inputs: {
            "language_name": {
                type: "text",
                label: "Name",
                value: props.language.language_name,
                required: true,
                minLength: 5,
                maxLength: 15,
            }
        }
    }

    let handleSubmit = () => {
        router.back();
    }


    let ref = useRef();

    const router = useRouter();

    return (
        <AdminLayout>
            <h1>Edit Language</h1>
            <Form ref={ref} formDetails={registerForm} onResponse={handleSubmit} />
        </AdminLayout>
    );
}
