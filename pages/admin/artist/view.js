import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let artists = await db.select("*")
        .from("tbl_artist")
        .innerJoin("tbl_login", "tbl_artist.email", "tbl_login.email");
    artists = JSON.parse(JSON.stringify(artists));

    artists = artists.map(artist=>{delete artist['artist_image']; return artist});
    
    return {
        props: { artists }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {

    return (
        <AdminLayout>
            <h1>Artists</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Artist id</th>
                        <th>email</th>
                        <th>name</th>
                        <th>image</th>
                        <th>phone</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Action</th>
                    </tr>

                    {
                        props.artists.map((user) => (
                            <tr key={user.aritst_id}>
                                <td>{user.artist_id}</td>
                                <td>{user.email}</td>
                                <td>{user.artist_name}</td>
                                <td><img 
                                    style = {{
                                        height: '100px',
                                        width: '100px', 
                                        objectFit: 'cover'
                                    }}
                                    src={"/api/image/artist/" + user.artist_id}/></td>
                                <td>{user.artist_phone}</td>
                                <td>{user.status ? "active" : "inactive"}</td>
                                <td>
                                    <a href={"/admin/artist/" + user.artist_id}>Edit</a>
                                </td>
                                <td>
                                    <a href={"/api/customer/" + user.email}>{user.status ? "disable" : "enable"}</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
