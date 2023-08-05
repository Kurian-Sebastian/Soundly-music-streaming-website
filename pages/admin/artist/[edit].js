import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    let artist = await db.select("*")
        .from("tbl_artist")
        .innerJoin("tbl_login", "tbl_artist.email", "tbl_login.email")
        .where('artist_id', '=', context.params.edit).first();

    artist = JSON.parse(JSON.stringify(artist));

    return {
        props: { artist }, // will be passed to the page component as props
    }
}

export default function AdminArtistEdit(props) {

    let registerForm = {
        apiRoute: '/api/auth/artist_register',
        submitButtonText: "Edit",
        file: true,
        inputs: {
            "email": {
                type: "email",
                label: "Email",
                value: props.artist.email,
                disabled: true,
                required: true,
                minLength: 5,
                maxLength: 50,
            },
            "artist_name": {
                type: "text",
                label: "Name",
                value: props.artist.artist_name,
                required: true,
                minLength: 5,
                maxLength: 15,
            },
            "artist_phone": {
                type: "text",
                datatype: "number",
                label: "Phone",
                value: props.artist.artist_phone,
                required: true,
                minLength: 7,
                maxLength: 10,
            },
            "artist_image": {
                type: "file",
                label: "Arist Image",
                required: true,
            },
        }
    }

    let handleSubmit = async (values) => {
        let formData = new FormData();
        formData.append('file', values.artist_image);
        formData.append('email', values.email);
        formData.append('artist_phone', values.artist_phone);
        formData.append('artist_name', values.artist_name);


        let rawResponse = await fetch('/api/artist/artist_edit', {
            method: 'POST',
            body: formData
        });
        let data = await rawResponse.json();
        if(rawResponse.status == 200){
            router.push('/admin/artist/view');
        }
    }

    let ref = useRef();

    const router = useRouter();

    return (
        <AdminLayout>
            <h1>Edit Aritst</h1>
            <Form ref={ref} formDetails={registerForm} onSubmit={handleSubmit} />
        </AdminLayout>
    );
}
