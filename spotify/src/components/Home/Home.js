import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPlaySharp } from "react-icons/io5";
import "./Home.css";
export default function Home() {
  const [toplists, setToplists] = useState(null);
  const [arab, setArab] = useState(null);
  const [newReleases, setNewReleases] = useState(null);

  const spotify = useSelector((state) => {
    return state.getAccessToken;
  });

  useEffect(() => {
    if (spotify) {
      /*  spotify.getCategories({ limit: 50 }).then(
        function (data) {
          console.log(data.body.categories);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      ); */

      spotify
        .getPlaylistsForCategory("toplists", {
          limit: 6,
          offset: 0,
        })
        .then(
          function (data) {
            setToplists(data.body.playlists.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      spotify
        .getPlaylistsForCategory("0JQ5DAqbMKFQ1UFISXj59F", {
          limit: 6,
          offset: 0,
        })
        .then(
          function (data) {
            setArab(data.body.playlists.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );

      spotify.getNewReleases({ limit: 6, offset: 8, country: "JO" }).then(
        function (data) {
          setNewReleases(data.body.albums.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [spotify]);
  /*  console.log(toplists);
  console.log(arab);
  console.log(newReleases);
 */
  return (
    <div className="divMainHome">
      <h1>Top Lists</h1>
      <div className="divCard">
        {toplists?.map((item, index) => {
          return (
            <Link className="Card" to={`/${item.type}/${item.id}`} key={index}>
              <div className="Card_Main">
                <img
                  className="Card_img"
                  src={item?.images[0].url}
                  alt=""
                ></img>
                <button>
                  <IoPlaySharp></IoPlaySharp>
                </button>
              </div>
              <h3>{item?.name}</h3>
            </Link>
          );
        })}
      </div>
      <h1>Arab</h1>
      <div className="divCard">
        {arab?.map((item, index) => {
          return (
            <Link className="Card" to={`/${item.type}/${item.id}`} key={index}>
              <div className="Card_Main">
                <img
                  className="Card_img"
                  src={item?.images[0].url}
                  alt=""
                ></img>
                <button /* onClick={()=>{play(item)}} */>
                  <IoPlaySharp></IoPlaySharp>
                </button>
              </div>

              <h3>{item?.name}</h3>
            </Link>
          );
        })}
      </div>
      <h1>Fresh New Music</h1>
      <div className="divCard">
        {newReleases?.map((item, index) => {
          return (
            <Link className="Card" to={`/${item.type}/${item.id}`} key={index}>
              <div className="Card_Main">
                <img
                  className="Card_img"
                  src={item?.images[0].url}
                  alt=""
                ></img>
                <button>
                  <IoPlaySharp></IoPlaySharp>
                </button>
              </div>
              <h3>{item?.name}</h3>
              <p>{item?.artists[0].name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
