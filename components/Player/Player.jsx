import { useEffect, useState, useRef, useContext } from "react";
import styles from '@/styles/Layout.module.css'
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolumeUp from '@mui/icons-material/VolumeUp';
import UserContext from "@/lib/usercontext";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MusicContext from "@/lib/musiccontext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Modal from "../Modal";
import Form from "../Form/Form";
import { useRouter } from "next/router";
import { requestWithAuth } from "@/lib/random_functions";
import { Button, Snackbar } from "@mui/material";


let addPlaylistForm = {
    apiRoute: '/api/playlist/create',
    submitButtonText: "Create",
    inputs: {
        "playlist_name": {
            type: "text",
            label: "Playlist Name",
            required: true,
            minLength: 5,
            maxLength: 30,
        }
    }
};

export default function Player() {

    let musicList = ["/api/file/2", "/api/file/3", "/api/file/4"];

    const [currrentMusic, setMusic] = useState(musicList[2]);

    const [currrentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(100);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [music, setCurrentSong, setPlayList] = useContext(MusicContext);
    const [user, setUser] = useContext(UserContext);

    const [playlist, setPlaylist] = useState(null);

    let player = useRef();
    let ref = useRef();
    let router = useRouter();

    useEffect(() => {
        if (music.currentSong) {
            player.current.src = "/api/file/" + music.currentSong.music_id;
            player.current.volume = volume / 100;
            player.current.play();
            setIsPlaying(true);
        }
        if (window.interval) {
            clearInterval(window.interval);
        }
        window.interval = setInterval(() => {
            if (music && music.currentSong) {
                if (!player.current.paused) {
                    if (player.current.currentTime + 1 > player.current.duration) {
                        nextSong();
                    }
                    setCurrentTime(player.current.currentTime);
                }
            }
        }, 1000);

        if (user && (user.type == "artist" || user.type == "customer")) {
            getCurrentSongLike();
        }
        return () => {
            clearInterval(window.interval);
        }
    }, [music]);


    useEffect(() => {

        console.log(router.pathname);
        console.log(router.asPath);

        if (music.currentSong) {
            player.current.src = "/api/file/" + music.currentSong.music_id;
        }
        (async () => {
            //let [res,playlists] = 
            if (user && (user.type == "artist" || user.type == "customer")) {
                let [res, data] = await requestWithAuth(router, '/api/playlist');
                setPlaylist(data)
            }
        })();
    }, []);

    let toggleMusic = () => {
        if (player.current.paused) {
            player.current.volume = volume / 100;
            player.current.play();
            setIsPlaying(true);
        } else {
            player.current.pause();
            setIsPlaying(false);
        }
    }


    let nextSong = async () => {
        if (music.currentSong) {
            let nextSongIndex = (getCurrentSongIndex() + 1) % music.playlist.length;
            setCurrentSong(music.playlist[nextSongIndex]);

        }
    }

    let previousSong = async () => {
        if (music.currentSong) {
            let previousSongIndex = (getCurrentSongIndex() - 1) % music.playlist.length;
            if (previousSongIndex < 0) {
                previousSongIndex = music.playlist.length - 1;
            }
            setCurrentSong(music.playlist[previousSongIndex]);

        }
    }


    let getCurrentSongIndex = () => {
        for (let i = 0; i < music.playlist.length; i++) {
            if (music.currentSong.music_id == music.playlist[i].music_id) {
                return i;
            }
        }
    }

    const changePosition = (event, newValue) => {
        player.current.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const changeVolume = (event, newValue) => {
        setVolume(newValue);
        player.current.volume = newValue / 100;
    };

    const onPlaylistCreate = async () => {
        let [res, data] = await requestWithAuth(router, '/api/playlist');
        setPlaylist(data)
    }

    const addToPlaylist = async (playlistItem) => {
        let [res, data] = await requestWithAuth(router, '/api/playlist/add_to_playlist',
            {
                music_id: music.currentSong.music_id,
                playlist_master_id: playlistItem.playlist_master_id
            }
        );
        setIsAddModalOpen(!isAddModalOpen);
        router.push("/playlist/" + playlistItem.playlist_master_id);
    }

    const getCurrentSongLike = async () => {
        if (music.currentSong) {
            let [res, data] = await requestWithAuth(router, '/api/playlist/favorite_state',
                {
                    music_id: music.currentSong.music_id,
                }
            );
            setLikeCount(data.likesCount);
            setIsLiked(data.isFavorite);
        }

    }

    const likeSong = async () => {
        await requestWithAuth(router, '/api/playlist/add_to_favorites',
            {
                music_id: music.currentSong.music_id,
            }
        );
        await getCurrentSongLike();
    }

    return (
        <div className={styles.bottomPlayer}>
            <audio ref={player} />
            <div className={styles.titleSection}>
                <div className={styles.titleSectionImage}>
                    {music.currentSong ?
                        <img src={"/api/image/music/" + music.currentSong.music_id} />
                        : <></>}
                </div>

                <div>
                    <p className={styles.musicTitle}>
                        {music.currentSong ?
                            music.currentSong.music_name
                            : <></>}
                    </p>
                    <p className={styles.artistName}>
                        {music.currentSong ?
                            music.currentSong.artist_name
                            : <></>}
                    </p>
                    <div className={styles.controlsContainer}>
                        <IconButton onClick={previousSong}>
                            <FastRewindRounded />
                        </IconButton>
                        <IconButton>

                            {!isPlaying ?
                                <PlayArrowRounded onClick={toggleMusic} fontSize="large" />
                                :
                                <PauseRounded onClick={toggleMusic} fontSize="large" />
                            }


                        </IconButton>
                        <IconButton onClick={nextSong}>
                            <FastForwardRounded />
                        </IconButton>
                    </div>
                </div>



            </div>

            <div className={styles.durationContainer}>

                {player.current && player.current.duration ?
                    <Slider onChange={changePosition} size="small" value={Math.round(currrentTime)} min={0} max={player.current.duration} aria-label="Disabled slider" />
                    :
                    <Slider size="small" value={0} aria-label="Disabled slider" />
                }



                <div className={styles.durationTextContainer}>
                    <p>{Math.round(currrentTime / 60)}:{Math.round(currrentTime % 60).toString().slice(0, 2).padStart(2, '0')}</p>
                    {player.current && player.current.duration ?
                        <p>{Math.round(player.current.duration / 60)}:
                            {Math.round(player.current.duration % 60).toString().slice(0, 2).padStart(2, '0')}</p>
                        : <p>0:00</p>}
                </div>
            </div>
            <div className={styles.volumeContainer}>
                <VolumeUp style={{ margin: '10px' }} />
                <Slider size="small" value={volume} onChange={changeVolume} min={0} max={100} step={1} aria-label="Disabled slider" />
            </div>

            {music.currentSong &&
                <div className={styles.musicActions}>
                    {user && (user.type == "artist" || user.type == "customer") ? 
                        isLiked ?
                        <Button onClick={likeSong} color="error" variant="outlined" endIcon={<FavoriteIcon color="error" />}>
                            {likeCount}
                        </Button>
                        :
                        <Button onClick={likeSong}  variant="outlined" endIcon={<FavoriteBorderIcon  />}>
                            {likeCount}
                        </Button> : <></>
                    }
                    {user && (user.type == "artist" || user.type == "customer") &&
                        <IconButton onClick={() => setIsAddModalOpen(!isAddModalOpen)}>
                            <PlaylistAddIcon />
                        </IconButton>
                    }
                    <IconButton onClick={() => { router.push("/current") }}>
                        <QueueMusicIcon />
                    </IconButton>
                </div>
            }

            <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(!isAddModalOpen) }} >
                <div className="admin-modal">
                    <h1>Add to Playlist </h1>
                    <br />
                    <br />
                    <div className="create-playlist-form">
                        <h3> Create a playlist</h3>
                        <br />
                        <Form ref={ref} formDetails={addPlaylistForm} onResponse={onPlaylistCreate} />
                    </div>
                    {playlist &&
                        <div className="playlist-add-container">
                            <br />
                            <br />
                            <h3>Playlists</h3>
                            {playlist.map((playlist_item) => (
                                <div className="playlist-add-item">
                                    <h4>{playlist_item.playlist_name}</h4>
                                    <Button variant="contained" onClick={() => addToPlaylist(playlist_item)}>Add</Button>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </Modal>
            {
                //<Snackbar
                //open={}
                //autoHideDuration={6000}
                //onClose={handleClose}
                //message="Note archived"
                //action={action}
                ///>
            }

        </div>
    );
}
