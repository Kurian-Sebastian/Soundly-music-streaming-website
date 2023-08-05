import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { request } from '@/lib/random_functions';
import MusicContext from '@/lib/musiccontext';

export default function CurrentQueue() {

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);
    let router = useRouter();

    useEffect(() => {
        if (!music.currentSong) {
            router.replace("/explore");
        }
    }, []);

    return (
        music.currentSong &&
        <div className="default-padding">
            <h1>Current Song</h1>
            <br/>
            <div className="current-song-flex">
                <div className="current-song-container">
                    <img src={"/api/image/music/" + music.currentSong.music_id} />
                    <h2>{music.currentSong.music_name}</h2>
                    <p>{music.currentSong.artist_name}</p>
                </div>

                <div className="music-queue">
                    <h2>Music Queue</h2>
                    <br />
                    {
                        music.playlist.map(queueItem =>
                            <div onClick={() => { setCurrentSong(queueItem) }} className={"queue-item " + (music.currentSong.music_id == queueItem.music_id ? "queue-selected" : "")}>
                                <img src={"/api/image/music/" + queueItem.music_id} />
                                <div>
                                    <h4>{queueItem.music_name}</h4>
                                    <p>{queueItem.artist_name}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    );
}
