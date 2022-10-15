import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import React from "react";
import BackAndForword from "./BackAndForword";
import "./HeaderUp.css";
import InputSearch from "./InputSearch";
import { useLocation } from "react-router-dom";
export default function HeaderUp() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);

  const user = useSelector((state) => {
    return state.getUser;
  });

  useEffect(() => {
    if (location.pathname.startsWith("/Search")) {
      setCheckSearch(true);
    } else {
      setCheckSearch(false);
      setSearch("");
    }
  }, [location.pathname]);

  /* useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]); */

  return (
    <div className="divMainHeader">
      <div className="user">
        {user?.images.length > 0 ? (
          <img src={user.images[0].url} alt=""></img>
        ) : (
          <BsPersonCircle></BsPersonCircle>
        )}

        <h1>{user?.display_name}</h1>
      </div>

      <BackAndForword></BackAndForword>

      {checkSearch ? (
        <InputSearch setSearch={setSearch} Search={search}></InputSearch>
      ) : (
        ""
      )}
    </div>
  );
}
