import AdminLayout from "@/components/admin_layout";
import db from "@/db";

export async function getServerSideProps(context) {

    let playlists = await db.select("*")
        .from("tbl_playlist_master")
        .innerJoin("tbl_playlist_child","tbl_playlist_child.playlist_master_id","tbl_playlist_master.playlist_master_id")
        .innerJoin("tbl_music","tbl_music.music_id","tbl_playlist_child.music_id");

    playlists = JSON.parse(JSON.stringify(playlists));

    playlists = playlists.map(music => {
        delete music.music_file;
        delete music.music_image;
        return music
    });


    return {
        props: { playlists }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>Playlists</h1>
            </div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>playlist id</th>
                        <th>playlist Name</th>
                        <th>Email</th>
                        <th>Music Name</th>
                        <th>Music Image</th>
                        <th>Playlist item status</th>
                    </tr>

                    {
                        props.playlists.map((playlist) => (
                            <tr key={playlist.playlist_child_id}>
                                <td>{playlist.playlist_child_id}</td>
                                <td>{playlist.playlist_name}</td>
                                <td>{playlist.email}</td>
                                <td>{playlist.music_name}</td>
                                <td><img
                                    style={{
                                        height: '100px',
                                        width: '100px',
                                        objectFit: 'cover'
                                    }}
                                    src={"/api/image/music/" + playlist.music_id} /></td>

                                <td>{playlist.playlist_status ? "active" : "inactive"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
