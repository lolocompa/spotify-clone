import "../app/css/page.css";
import { playlist } from "@/data";
import { useSongContext } from "@/app/layout";
import PlayIcon from "../app/icons/PlayIcon";
import PauseIcon from "../app/icons/PauseIcon";

export default function Home() {
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } =
    useSongContext();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = "";

  if (currentHour < 12) {
    greeting = "Buenos dias";
  } else if (currentHour < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }


  const handleChange = (song) => {
    setCurrentSong(song)
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="main-page">
      <div className="navigator"></div>
      <h2 className="greetings">{greeting}</h2>
      <div className="songs-container">
        {playlist.map((song) => {
          const artistsString = song.artists.join(", ");
          const isCurrentSong = currentSong && currentSong.id === song.id;

          return (
            <div className="main-songs" key={song.id}>
              <div>
                <img src={song.image} alt={song.title} />
                {isCurrentSong ? (
                  <div className="icon-pause" onClick={() => handleChange(song)}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </div>
                ) : (
                  <div className="icon-play" onClick={() => handleChange(song)}>
                    <PlayIcon />
                  </div>
                )}
              </div>
              <h3>{song.title}</h3>
              <h4>{artistsString}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
