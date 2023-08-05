import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    let genre = await db.select("*")
        .from("tbl_genre")
        .where('genre_id', '=', context.params.edit).first();

    genre = JSON.parse(JSON.stringify(genre));

    return {
        props: { genre }, // will be passed to the page component as props
    }
}

export default function AdminArtistEdit(props) {

    let registerForm = {
        apiRoute: '/api/genre/edit_genre',
        submitButtonText: "Update",
        id: props.genre.genre_id,
        inputs: {
            "genre_name": {
                type: "text",
                label: "Name",
                value: props.genre.genre_name,
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
            <h1>Edit Genre</h1>
            <Form ref={ref} formDetails={registerForm} onResponse={handleSubmit} />
        </AdminLayout>
    );
}
