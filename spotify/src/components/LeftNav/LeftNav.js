import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import "./LeftNav.css";
export default function LeftNav() {
  return (
    <div className="divMain">
      <div className="divMain1">
        <Link to={"/"}>
          <img
            src="http://mhdnyc.splashthat.com/img/events/52537/assets/6274.spotify-logo-horizontal-white-rgb.png"
            alt="logo"
          ></img>
        </Link>

        <div className="divMain2">
          <div className="divMain3">
            <Link to={"/"}>
              <IoHomeOutline></IoHomeOutline>
              <h1>Home</h1>
            </Link>
          </div>

          <div className="divMain4">
            <Link to={"/Search"}>
              <GoSearch></GoSearch>
              <h1>Search</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
