"use client";

import React, { useState, useEffect } from "react";
import "../app/css/player.css";
import PlayIcon from "@/app/icons/PlayIcon";
import PauseIcon from "@/app/icons/PauseIcon";
import { useSongContext } from "@/app/layout";
import SpotifyVolume from "@/app/icons/SpotifyVolume";
import MuteIcon from "@/app/icons/MuteIcon";

const Player = () => {
  const { audioRef, currentSong, isPlaying, setIsPlaying } = useSongContext();
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60);

  const seconds2 = Math.floor(progress % 60);
  const minutes2 = Math.floor(progress / 60);

  const handleVolumeChange = (event) => {
    const newValue = event.target.value;
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
    event.target.style.setProperty("--value", `${newValue}%`);
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = (newTime / 100) * duration;
    }
    event.target.style.setProperty("--value", `${newTime}%`);
  };

  const handleTimeBarClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * 100;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = (newTime / 100) * duration;
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      setVolume(previousVolume);
      if (audioRef.current) {
        audioRef.current.volume = previousVolume / 100;
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      audioRef.current.src = currentSong.audioURL;
      audioRef.current.volume = volume / 100;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
        setProgress(audioRef.current.currentTime);
      };
      if (isPlaying) {
        audioRef.current.play();
      }
    } else {
      // If currentSong is null, stop the audio and reset its state
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset the currentTime
      }
      setProgress(0); // Reset the progress
      setCurrentTime(0); // Reset the currentTime slider
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  if (!currentSong) {
    return null; // Return null to render nothing if there's no current song
  }

  return (
    <div className="player-container">
      <div className="player">
        <div className="left">
          <div className="left-container">
            <div className="songImg">
              <img
                className="songImg"
                src={currentSong.image}
                alt={currentSong.title}
              />
            </div>
            <div className="songInfo">
              <h3>{currentSong.title}</h3>
              <h4>{currentSong.artists.join(", ")}</h4>
            </div>
          </div>
        </div>
        <div className="middle">
          {isPlaying ? (
            <div className="button-play" onClick={pause}>
              <PauseIcon />
            </div>
          ) : (
            <div className="button-play" onClick={play}>
              <PlayIcon />
            </div>
          )}
          <div className="time-container" onClick={handleTimeBarClick}>
            <h3 className="current-time">{`${minutes2}:${
              seconds2 < 10 ? "0" : ""
            }${seconds2}`}</h3>
            <input
              type="range"
              max={100}
              min={0}
              value={currentTime}
              className="slider slider-time"
              onChange={handleTimeChange}
              style={{ "--value": `${currentTime}%` }}
            />
            <h3 className="current-time">{`${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}</h3>
          </div>
        </div>
        <div className="right">
          <div className="volume-icon" onClick={toggleMute}>
            {volume > 0 ? <SpotifyVolume /> : <MuteIcon />}
          </div>
          <div className="slider-container">
            <input
              type="range"
              max={100}
              min={0}
              value={volume}
              className="slider"
              onChange={handleVolumeChange}
              style={{ "--value": `${volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
