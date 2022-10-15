import React, { useRef, useState } from "react";
import { useEffect } from "react";
import "./Mp3Track.css";
import Slider from "@mui/material/Slider";

import { BsVolumeUp } from "react-icons/bs";
import { IoPlaySharp, IoPause } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Mp3Track() {
  const spotify = useSelector((state) => {
    return state.getAccessToken;
  });
  const mp3Track = useSelector((state) => {
    return state.getMp3Track;
  });
  console.log(mp3Track);

  return (
    <div className={mp3Track ? "mp3Player" : `mp3Player ${"mp3Player_op"}`}>
      <div className="mp3Player_start">
        <img
          src={mp3Track?.img || "/asset/defulatimage.png"}
          alt={mp3Track?.name}
        ></img>
        <div>
          <h3>{mp3Track?.name}</h3>
          <p>{mp3Track?.artists}</p>
        </div>
      </div>
      <audio src={mp3Track?.preview_url} controls autoPlay></audio>
    </div>
  );
}
