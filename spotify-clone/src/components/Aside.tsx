// components/Aside.js
"use client";

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LibraryIcon from "../app/icons/LibraryIcon";
import { playlist } from "@/data";
import SongCard from "./songCard";
import { useSongContext } from "@/app/layout";
import { useRouter } from "next/navigation";

const Aside = () => {
  const { setCurrentSong, currentSong } = useSongContext();
  const router = useRouter();

  const homeReturn = () => {
    router.push("/");
  };

  return (
    <div className="aside">
      <div className="top-aside">
        <div onClick={homeReturn} className="home-container">
          <i className="bi bi-house-door"></i>
          <h3>Home</h3>
        </div>
        <div className="search-container">
          <i className="bi bi-search"></i>
          <h3>Search</h3>
        </div>
      </div>
      <div className="biblioteca">
        <div className="icon-container">
          <LibraryIcon />
          <h3>Your library</h3>
        </div>
        <div className="cards">
          {playlist.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
