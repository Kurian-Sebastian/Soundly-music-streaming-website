import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let genres = await db.select("*")
        .from("tbl_genre")
    genres = JSON.parse(JSON.stringify(genres));

    return {
        props: { genres }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>Genres</h1>
            <a href="/admin/genre/genre_add">Add genre</a>
            </div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Genre id</th>
                        <th>Genre</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>

                    {
                        props.genres.map((genre) => (
                            <tr key={genre.genre_id}>
                                <td>{genre.genre_id}</td>
                                <td>{genre.genre_name}</td>
                                <td>{genre.genre_status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/genre/" + genre.genre_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/genre/" + genre.genre_id}>{genre.genre_status ? "disable" : "enable"}</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
