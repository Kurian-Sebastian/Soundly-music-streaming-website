import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import db from "@/db";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {

    let music = await db.select().from("tbl_music").where("music_id", '=', context.params.music).first();

    delete music.music_file;
    delete music.music_image;


    music = JSON.parse(JSON.stringify(music));

    return {
        props: { music_id: context.params.music, music: music }, // will be passed to the page component as props
    }
}

export default function AdminMusicPayment(props) {

    let registerForm = {
        apiRoute: '/api/music/payment',
        submitButtonText: "Pay",
        id: props.music_id,
        inputs: {
            "card_name": {
                type: "text",
                label: "Card Name",
                required: true,
                minLength: 3,
                maxLength: 25,
            },
            "card_number": {
                type: "text",
                label: "Card No.",
                datatype: "number",
                required: true,
                minLength: 16,
                maxLength: 16,
            },
            "card_expiry_month": {
                type: "text",
                label: "Expiry Month",
                datatype: "number",
                required: true,
                minLength: 1,
                maxLength: 2,
            },
            "card_expiry_year": {
                type: "text",
                label: "Expiry Year",
                datatype: "number",
                required: true,
                minLength: 4,
                maxLength: 4,
            },
            "card_cvv": {
                type: "password",
                label: "CVV",
                datatype: "number",
                required: true,
                minLength: 3,
                maxLength: 3,
            },
        }
    }

    let handleSubmit = () => {
        router.back();
    }

    let ref = useRef();

    const router = useRouter();

    return (
        <AdminLayout>
            <h1>Pay for Song</h1>
            <p> Price: {props.music.music_price}</p>
            <Form ref={ref} formDetails={registerForm} onResponse={handleSubmit} />
        </AdminLayout>
    );
}
