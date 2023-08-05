import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import { useRef } from "react";
import db from "@/db";

export async function getServerSideProps(context) {
    let publishers = await db.select({ label: "publisher_name", value: "publisher_id" })
        .from("tbl_publisher")
        .innerJoin("tbl_login", "tbl_publisher.email", "tbl_login.email")
        .where("status", "=", 1);

    let genres = await db.select({ label: "genre_name", value: "genre_id" })
        .from("tbl_genre")
        .where("genre_status", "=", 1);

    let languages = await db.select({ label: "language_name", value: "language_id" })
        .from("tbl_language")
        .where("language_status", "=", 1);

    publishers = JSON.parse(JSON.stringify(publishers));
    genres = JSON.parse(JSON.stringify(genres));
    languages = JSON.parse(JSON.stringify(languages));
    return {
        props: { publishers, genres, languages }, // will be passed to the page component as props
    }
}


export default function AdminMusicAddView(props) {

    let registerForm = {
        apiRoute: '/api/music/add_music',
        submitButtonText: "Add",
        inputs: {
            "music_name": {
                type: "text",
                label: "Name",
                required: true,
                minLength: 5,
                maxLength: 25,
            },
            "publisher_id": {
                type: "select",
                datatype: "number",
                label: "Publisher",
                value: props.publishers[0].value,
                selectValues: props.publishers,
                required: true,
            },
            "genre_id": {
                type: "select",
                datatype: "number",
                label: "Genre",
                value: props.genres[0].value,
                selectValues: props.genres,
                required: true,
            },
            "language_id": {
                type: "select",
                datatype: "number",
                label: "Language",
                value: props.languages[0].value,
                selectValues: props.languages,
                required: true,
            },
            "music_file": {
                type: "file",
                label: "Music File",
                fileType: ".mp3",
                required: true,
            },
            "music_image": {
                type: "file",
                label: "Music Image",
                fileType: ".jpg",
                required: true,
            },
        }
    }

    let ref = useRef();
    const router = useRouter();

    
    let handleSubmit = async (values) => {
        let formData = new FormData();
        formData.append('music_file', values.music_file);
        formData.append('music_image', values.music_image);
        formData.append('music_name', values.music_name);
        formData.append('genre_id', values.genre_id);
        formData.append('language_id', values.language_id);
        formData.append('publisher_id', values.publisher_id);

        let rawResponse = await fetch('/api/music/add_music', {
            method: 'POST',
            body: formData
        });
        let data = await rawResponse.json();
        if(rawResponse.status == 200){
            console.log(data);
            router.push('/admin/music/view');
        }
    }


    return (
        <AdminLayout>
            <h1>Add music</h1>
            <Form ref={ref} formDetails={registerForm} onSubmit={handleSubmit} />
        </AdminLayout>
    );
}
