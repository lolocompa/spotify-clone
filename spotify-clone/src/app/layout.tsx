"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import "./globals.css";
import Aside from "@/components/Aside";
import Player from "@/components/Player";

// Create the context
const SongContext = createContext(null);

// Create a hook to use the context
const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongContext must be used within a SongProvider");
  }
  return context;
};

// Provide the context
const SongProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    // Stop the song when the component unmounts
    return () => {
      setIsPlaying(false);
      audioRef.current.pause();
    };
  }, []);

  const value = {
    audioRef,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};

const PlayerWrapper = () => {
  return <Player />;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SongProvider>
      <div className="page">
        <div className="container-flex">
          <Aside />
          <div className="main">{children}</div>
        </div>
        <PlayerWrapper />
      </div>
    </SongProvider>
  );
}

export { useSongContext };
