import React, { useEffect, useState } from "react";
import { playlist } from "@/data";
import "../app/css/playlist.css";

const Playlist = ({ playlistId }) => {
  const [playlistData, setPlaylistData] = useState(null);
  let artistsString;
  if (playlistData) {
    artistsString = playlistData.artists.join(", ");
  }

  useEffect(() => {
    if (playlistId) {
      setPlaylistData(playlist[playlistId]);
    }
  }, [playlistId]);

  return (
    <div>
      {playlistData && (
        <div className="playlist-container">
          <div className="playlist-header">
            <div className="img-container">
              <img src={playlistData.image} alt="" />
            </div>
            <div className="playlist-info">
              <h5>Playlist</h5>
              <h2>{playlistData.album}</h2>
              <h4>{artistsString}</h4>
              <h3>50 canciones, 4h aproximadamente</h3>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="row1">#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr className="trow" key={index}>
                  <td>{playlistData.id}</td>
                  <td className="td">
                    <img src={playlistData.image} alt="" />
                    <div className="td-info">
                      <h3>{playlistData.title}</h3>
                      <h3>{artistsString}</h3>
                    </div>
                  </td>
                  <td>{playlistData.album}</td>
                  <td>{playlistData.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Playlist;
