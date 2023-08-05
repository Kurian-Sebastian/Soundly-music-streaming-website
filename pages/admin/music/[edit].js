import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import { useRef } from "react";
import db from "@/db";
import { auth } from "@/lib/random_functions";

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

    let music = await db.select("*")
        .from("tbl_music")
        .where('music_id', '=', context.params.edit).first();

    delete music.music_file;
    delete music.music_image;

    publishers = JSON.parse(JSON.stringify(publishers));
    genres = JSON.parse(JSON.stringify(genres));
    languages = JSON.parse(JSON.stringify(languages));
    music = JSON.parse(JSON.stringify(music));

    return {
        props: { publishers, genres, languages, music }, // will be passed to the page component as props
    }
}


export default function AdminMusicAddView(props) {

    let registerForm = {
        apiRoute: '/api/music/edit_music',
        submitButtonText: "Edit",
        id: props.music.music_id, 
        inputs: {
            "music_name": {
                type: "text",
                label: "Name",
                value: props.music.music_name,
                required: true,
                minLength: 5,
                maxLength: 15,
            },
            "publisher_id": {
                type: "select",
                datatype: "number",
                label: "Publisher",
                value: props.music.publisher_id,
                selectValues: props.publishers,
                required: true,
            },
            "genre_id": {
                type: "select",
                datatype: "number",
                label: "Genre",
                value: props.music.genre_id,
                selectValues: props.genres,
                required: true,
            },
            "language_id": {
                type: "select",
                datatype: "number",
                label: "Language",
                value: props.music.language_id,
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
        formData.append('music_id', props.music.music_id);
        formData.append('language_id', values.language_id);
        formData.append('publisher_id', values.publisher_id);

        let rawResponse = await fetch('/api/music/add_music', {
            method: 'POST',
            body: formData
        });
        let data = await rawResponse.json();
        if (rawResponse.status == 200) {
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
