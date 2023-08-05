import db from "@/db";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useContext, useEffect, useState } from "react";
import MusicContext from "@/lib/musiccontext";
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { requestWithAuth } from "@/lib/random_functions";
import UserContext from "@/lib/usercontext";

export async function getServerSideProps(context) {
    let artist = await db.select(
        "artist_id",
        "email",
        "artist_phone",
        "date_added",
        "artist_name"
    )
        .from("tbl_artist")
        .where('artist_id', '=', context.params.artist_id).first();

    // TODO select only required feilds
    let artist_music = await db.select("*").from("tbl_music")
        .innerJoin("tbl_artist", "tbl_artist.artist_id", "tbl_music.artist_id")
        .innerJoin("tbl_genre", "tbl_music.genre_id", "tbl_genre.genre_id")
        .innerJoin("tbl_language", "tbl_music.language_id", "tbl_language.language_id")
        .where('tbl_artist.artist_id', '=', context.params.artist_id)
        .andWhere('music_status', '=', "paid");


    let follows = await db.select()
        .from("tbl_follower")
        .count({ total: 'follower_id' })
        .where('artist_id', '=', artist.artist_id)
        .andWhere('follow_status', '=', 1).first();


    artist_music = artist_music.map(music => {
        delete music.music_file;
        delete music.music_image;
        delete music.artist_image;
        return music
    });

    artist_music = JSON.parse(JSON.stringify(artist_music));
    artist = JSON.parse(JSON.stringify(artist));
    follows = JSON.parse(JSON.stringify(follows));

    return {
        props: { artist, artist_music, follows }, // will be passed to the page component as props
    }

}

export default function ArtistsView(props) {

    let router = useRouter();

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);
    const [user, setUser] = useContext(UserContext);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followCount, setFollowCount] = useState(props.follows.total);

    let playSong = (music_item) => {
        setCurrentSong(music_item, props.artist_music);
        router.push("/current");
    }

    let followArtist = async () => {
        await requestWithAuth(router, '/api/follower/add',
            {
                artist_id: props.artist.artist_id,
            }
        );
        await getCurrentFollowingState();

    }

    const getCurrentFollowingState = async () => {
        let [res, data] = await requestWithAuth(router, '/api/follower/follower_state',
            {
                artist_id: props.artist.artist_id,
            }
        );
        setIsFollowing(data.isFollowing);
        return data.isFollowing;
    }

    useEffect(() => {
        (async () => {
            await getCurrentFollowingState();
        })();
    }, []);

    return (
        <div className="default-padding">

            <div className="artist-header">
                <img src={"/api/image/artist/" + props.artist.artist_id} />
                <div className="artist-header-details">
                    <h3>Artist</h3>
                    <h1>{props.artist.artist_name}</h1>
                    <h4>{followCount} Followers</h4>
                    {user && (user.type == "artist" || user.type == "customer") &&
                        isFollowing ?
                        <Button onClick={followArtist} variant="outlined" startIcon={<PersonAddDisabledIcon />}>Unfollow</Button>
                        :
                        <Button onClick={followArtist} variant="contained" startIcon={<PersonAddIcon />}>Follow</Button>
                    }
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <h2>Songs</h2>
            <br />
            <div className="music-grid">
                {props.artist_music.length ?
                    props.artist_music.map(music =>
                        <div onClick={() => { playSong(music) }} className="music-grid-item">
                            <img src={"/api/image/music/" + music.music_id} />
                            <h3>{music.music_name}</h3>
                            <p>{music.artist_name}</p>
                        </div>
                    )
                    : <p>No Music Found!</p>}
            </div>
        </div>
    );
}
