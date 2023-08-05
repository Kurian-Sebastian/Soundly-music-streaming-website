import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let languages = await db.select("*")
        .from("tbl_language")
    languages = JSON.parse(JSON.stringify(languages));

    return {
        props: { languages }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>languages</h1>
            <a href="/admin/language/language_add">Add language</a>
            </div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>language id</th>
                        <th>language</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>

                    {
                        props.languages.map((language) => (
                            <tr key={language.language_id}>
                                <td>{language.language_id}</td>
                                <td>{language.language_name}</td>
                                <td>{language.language_status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/language/" + language.language_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/language/" + language.language_id}>{language.language_status ? "disable" : "enable"}</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
