import AdminLayout from "@/components/admin_layout";
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";
import { useRef } from "react";

export async function getServerSideProps(context) {
    return {
        props: { music_id: context.params.music }, // will be passed to the page component as props
    }
}

export default function AdminMusicEdit(props) {

    let registerForm = {
        apiRoute: '/api/music/approve_music',
        submitButtonText: "Approve",
        id: props.music_id,
        inputs: {
            "music_price": {
                type: "text",
                label: "Price to ask",
                datatype: "number",
                required: true,
                minLength: 3,
                maxLength: 5,
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
            <h1>Approve Song</h1>
            <Form ref={ref} formDetails={registerForm} onResponse={handleSubmit} />
        </AdminLayout>
    );
}
