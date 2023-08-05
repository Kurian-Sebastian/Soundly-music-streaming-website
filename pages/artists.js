import db from "@/db";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useRouter } from "next/router";

export async function getServerSideProps(context) {


    let artists = await db.select(
        "artist_id",
        "email",
        "artist_phone",
        "date_added",
        "artist_name"
    )
    .from("tbl_artist");


    artists = JSON.parse(JSON.stringify(artists));

    return {
        props: { artists }, // will be passed to the page component as props
    }

}

export default function ArtistsList(props) {

    let router = useRouter();

    return (
        <div className="default-padding">
            <h1>All Artists</h1>
            <br />
            <br />
            <div className="music-grid">
                {props.artists.map((artist) => (

                        <div onClick={()=>router.push("/artist/" + artist.artist_id)} className="music-grid-item">
                            <img className="artist-list-image" src={"/api/image/artist/" + artist.artist_id} />
                            <br/>
                            <h3>{artist.artist_name}</h3>
                        </div>
                ))}
            </div>
        </div>
    );
}
