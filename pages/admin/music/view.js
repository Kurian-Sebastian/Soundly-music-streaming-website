import AdminLayout from "@/components/admin_layout";
import db from "@/db";
import { auth } from "@/lib/random_functions";

export async function getServerSideProps(context) {
    auth(context.req)

    let user = context.req.user;

    let query = db.select("*")
        .from("tbl_music")
        .innerJoin("tbl_artist", "tbl_music.artist_id", "tbl_artist.artist_id")
        .innerJoin("tbl_publisher", "tbl_music.publisher_id", "tbl_publisher.publisher_id")
        .innerJoin("tbl_genre", "tbl_music.genre_id", "tbl_genre.genre_id")
        .innerJoin("tbl_language", "tbl_music.language_id", "tbl_language.language_id")

    if (user.type == "publisher") {
        query.where('tbl_music.publisher_id', '=', user.publisher_id);
        query.whereIn('music_status', ["waiting", "rejected", "approved", "paid"]);

    } else if (user.type == "artist") {
        query.where('tbl_music.artist_id', '=', user.artist_id);
    }

    let musics = await query;

    musics = musics.map(music => {
        delete music.music_file;
        delete music.music_image;
        return music
    });


    musics = JSON.parse(JSON.stringify(musics));

    return {
        props: { musics, user }, // will be passed to the page component as props
    }
}

export default function AdminCustomerView(props) {
    return (
        <AdminLayout>
            <div class="admin-header">
            <h1>Music</h1>
            {props.user.type == "artist" ?
                <a href="/admin/music/music_add">Add music</a>
                : <></>}
            </div>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>Music id</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Language</th>
                        <th>Audio</th>
                        <th>Cover Image</th>
                        <th>Price</th>
                        <th>Status</th>

                        {props.user.type != "publisher" ?
                            <th>Publisher</th>
                            : <></>}

                        <th>Actions</th>



                    </tr>

                    {
                        props.musics.map((music) => (
                            <tr key={music.music_id}>
                                <td>{music.music_id}</td>
                                <td>{music.music_name}</td>
                                <td>{music.genre_name}</td>
                                <td>{music.language_name}</td>
                                <td>
                                    <audio controls src={"/api/file/" + music.music_id} />
                                </td>
                                <td><img
                                    style={{
                                        height: '100px',
                                        width: '100px',
                                        objectFit: 'cover'
                                    }}
                                    src={"/api/image/music/" + music.music_id} /></td>

                                <td>{music.music_price}</td>
                                <td>{music.music_status}</td>

                                {props.user.type != "publisher" ?
                                    <td>{music.publisher_name}</td>
                                    : <></>
                                }

                                <td>

                                    {props.user.type == "artist" ?
                                        <>
                                            {music.music_status == "waiting" ?
                                                <a href={"/admin/music/" + music.music_id}>Edit</a>
                                                : <></>}


                                            {music.music_status == "approved" ?
                                                <a href={"/admin/music/pay_music/" + music.music_id}>Pay to publish</a>
                                                : <></>}
                                        </>

                                        : <></>
                                    }

                                    {props.user.type == "publisher" && music.music_status != "paid" ?
                                        <a href={"/admin/music/approve/" + music.music_id}>Approve</a>
                                        : <></>
                                    }

                                    {props.user.type == "publisher" && music.music_status != "paid" ?
                                        <a href={"/api/music/reject/" + music.music_id}>Reject</a>
                                        : <></>
                                    }
                                    
                                    

                                    {props.user.type == "artist" && 
                                    <>
                                    {
                                      music.music_status=="deleted" ?
                                       <a href={"/api/music/disable/" + music.music_id}>enable</a>  
                                      : <a href={"/api/music/disable/" + music.music_id}>disable</a>
                                    } 
                                    </>
                                    }    
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    );
}
