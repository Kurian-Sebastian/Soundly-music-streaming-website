import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import SearchContext from '@/lib/search';
import { request } from '@/lib/random_functions';
import MusicContext from '@/lib/musiccontext';

export default function Explore() {

    const [searchBy, search] = useContext(SearchContext);
    const [musics, setMuscis] = useState([]);

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);

    let router = useRouter();

    useEffect(() => {

        (async () => {
            let [res, data] = await request("/api/music", { searchBy })
            console.log(data);
            setMuscis(data);
        })();
    }, [searchBy]);

    let changeSong = async (music) => {
        let [_, data] = await request("/api/music/random_playlist");
        setCurrentSong(music,data);
        router.push("/current");
    }

    return (
        <div className="default-padding">
            <h1>Find Songs</h1>
            <br />
            <br />
            <div className="music-grid">
                {musics.length ?
                    musics.map(music =>
                        <div onClick={()=>changeSong(music)} className="music-grid-item">
                            <img src={"/api/image/music/" + music.music_id} />
                            <h3>{music.music_name}</h3>
                            <p>{music.artist_name}</p>
                        </div>
                    )
                    : <p>No Music Found!</p>}
            </div>
        </div>
    )
}
