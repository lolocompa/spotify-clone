import React from "react";
import { useRouter } from "next/navigation";
import "../app/css/songCard.css";
import { useSongContext } from "@/app/layout";

const SongCard = ({
  song,
}: {
  song: {
    id: number;
    albumId: number;
    title: string;
    image: string;
    artists: string[];
    album: string;
    duration: string;
    audioURL: string;
    isPlaying: boolean;
  };
}) => {
  const artistsString = song.artists.join(", ");
  const { setCurrentSong, setIsPlaying, isPlaying } = useSongContext();
  const router = useRouter();

  const handleNavigate = () => {
    // Pause the current song before navigating
    router.push(`/playlist/${song.id}`);
  };

  return (
    <div className="song-card" onClick={handleNavigate}>
      <img className="song-pic" src={song.image} alt={song.title} />
      <div className="song-info">
        <h3>{song.title}</h3>
        <h4>{artistsString}</h4>
      </div>
    </div>
  );
};

export default SongCard;
