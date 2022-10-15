import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "./Search.css";
import { Link } from "react-router-dom";
import { IoPlaySharp } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { get_mp3Track } from "../../redux/actionTypes";
export default function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spotify = useSelector((state) => {
    return state.getAccessToken;
  });
  const [all, setAll] = useState(null);
  const [artist, setArtist] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [name, setName] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (typeof params.search === "string" && params.search.length !== 0) {
      if (location.pathname.startsWith(`/Search/${params?.search}`)) {
        spotify
          .searchTracks(params.search, {
            limit: 50,
            offset: 0,
          })
          .then(
            function (data) {
              setAll(data.body);
            },
            function (err) {
              console.error(err);
            }
          );
      }

      spotify
        .searchArtists(params.search, {
          limit: 50,
          offset: 0,
        })
        .then(
          function (data) {
            setArtist(data.body);
          },
          function (err) {
            console.error(err);
          }
        );

      spotify
        .searchPlaylists(params.search, {
          limit: 50,
          offset: 0,
        })
        .then(
          function (data) {
            setPlaylists(data.body);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  }, [params]);
  /* console.log(params.search);  */
  /* refactor test*/
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function playSong({ name, preview_url, img, duration_ms, artists, album }) {
    dispatch({
      type: get_mp3Track.type,
      track: preview_url
        ? {
            name,
            preview_url,
            img,
            duration_ms,
            artists,
            album,
          }
        : null,
    });
  }

  /* console.log(all);
  console.log(artist);
  console.log(playlists);
  console.log(all?.tracks?.items[0]?.name); */
  /* console.log(location.pathname); */
  return (
    <div>
      {location.pathname.startsWith(`/Search/${params?.search}`) ? (
        <div className="divTag">
          <Link className="linkTag" to={`/Search/${params?.search}`}>
            All
          </Link>
          <Link
            className="linkTag"
            to={`/Search/${params?.search}/${all?.tracks?.items[0]?.type}`}
          >
            Songs
          </Link>
          <Link
            className="linkTag"
            to={`/Search/${params?.search}/${artist?.artists?.items[0]?.type}`}
          >
            Artists
          </Link>
          <Link
            className="linkTag"
            to={`/Search/${params?.search}/${playlists?.playlists?.items[0]?.type}`}
          >
            playlists
          </Link>
        </div>
      ) : (
        ""
      )}
      {location.pathname === `/Search/${params?.search}` && (
        <div className="divMainSearch">
          <div className="divTopResult">
            <h1>Top Result</h1>
            <Link
              className="harfTopResult"
              to={`/${all?.tracks?.items[0]?.album?.type}/${all?.tracks?.items[0]?.album?.id}`}
            >
              <img
                className="imgTopResult"
                src={all?.tracks?.items[0]?.album.images[0]?.url}
                alt=""
              ></img>

              <h1>{all?.tracks?.items[0]?.name}</h1>
              <h2>{all?.tracks?.items[0]?.artists[0]?.name}</h2>
              <div className="divTopResult2">
                <button>
                  <IoPlaySharp></IoPlaySharp>
                </button>
              </div>
            </Link>
          </div>
          <div className="divSongs1">
            <h1>Songs</h1>
            <div className="divSongs2">
              {all?.tracks?.items?.map((item, index) => {
                return (
                  <div key={index}>
                    {index < 4 && (
                      <div className="divSongs3">
                        <img src={item?.album?.images[0]?.url} alt=""></img>

                        <button>
                          <IoPlaySharp></IoPlaySharp>
                        </button>

                        <h2>{item?.name}</h2>
                        <Link
                          className="divSongs3Link"
                          to={`/${item.artists[0].type}/${item.artists[0].id}`}
                        >
                          <h3>{item.artists[0].name}</h3>
                        </Link>
                        <div className="divSongsButton">
                          <button>
                            <GiSelfLove></GiSelfLove>
                          </button>
                        </div>
                        <div className="durationSongsAll">
                          {millisToMinutesAndSeconds(item?.duration_ms)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="divAlbums1">
            <h1>Albums</h1>

            {all?.tracks?.items?.map((item, index) => {
              return (
                <div key={index} className="divAlbumsIndex">
                  {index < 6 && (
                    <Link
                      className="herfAlbums"
                      to={`/${item?.album?.type}/${item?.album?.id}`}
                    >
                      <div className="divAlbums4">
                        <img
                          className="imgalbums"
                          src={item?.album?.images[0]?.url}
                          alt=""
                        ></img>

                        <button>
                          <IoPlaySharp></IoPlaySharp>
                        </button>
                      </div>
                      <div className="divAlbums2">{item?.album?.name}</div>

                      <div className="divAlbums3">
                        {new Date(item?.album?.release_date).getFullYear()}
                      </div>
                      <Link
                        className="herfAlbums1"
                        to={`/${item?.artists[0]?.type}/${item?.artists[0]?.id}`}
                      >
                        <div>{item?.artists[0]?.name}</div>
                      </Link>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <div className="divArtists">
            <h1>Artists</h1>

            {all?.tracks?.items?.map((item, index) => {
              return (
                <div key={index} className="divArtistsIndex">
                  {index < 6 && (
                    <Link
                      className="herfArtists"
                      to={`/${item?.artists[0]?.type}/${item?.artists[0]?.id}`}
                    >
                      <div className="divArtists1">
                        <img
                          className="imgArtists"
                          src={item?.album?.images[0]?.url}
                          alt=""
                        ></img>
                        <button>
                          <IoPlaySharp></IoPlaySharp>
                        </button>
                      </div>
                      <div className="divArtists2">
                        {item?.artists[0]?.name}
                      </div>

                      <div className="divArtists3">
                        {item?.artists[0]?.type}
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {params?.type === "track" && (
        <div className="trackDiv">
          <div className="divH1">
            <div className="divH2">
              <h1>#</h1>
              <h1 style={{ marginLeft: 18 }}>TITLE</h1>
            </div>
            <h2 style={{ left: 50 }}>ALBUM</h2>
            <h2>Time</h2>
          </div>
          <div className="trackDiv1">
            {all?.tracks?.items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`trackDiv2 ${index + 1 >= 10 && "trackDiv80"}`}
                >
                  <div className="trackDivIndex">{index + 1} </div>
                  <div className="trackDivImg">
                    <img src={item?.album?.images[0]?.url} alt=""></img>
                    <button
                      onClick={(e) =>
                        playSong({
                          name: item?.name,
                          preview_url: item?.preview_url,
                          img: item?.album?.images[0]?.url,
                          duration_ms: millisToMinutesAndSeconds(
                            item?.duration_ms
                          ),
                          artists: item?.artists[0]?.name,
                          album: item?.album?.name,
                        })
                      }
                    >
                      <IoPlaySharp></IoPlaySharp>
                    </button>
                  </div>
                  <div className="trackDiv3">
                    <h1>
                      {name ? (
                        <span className="Span">
                          {item?.name?.length > 15 ? (
                            <span>
                              {item?.name}
                              <span onClick={() => setName(false)}>...</span>
                            </span>
                          ) : (
                            item?.name
                          )}
                        </span>
                      ) : (
                        <span>
                          {item?.name?.length > 15 ? (
                            <span>
                              {item?.name?.slice(0, 14)}
                              <span onClick={() => setName(true)}>...</span>
                            </span>
                          ) : (
                            item?.name
                          )}
                        </span>
                      )}
                    </h1>
                    <Link
                      style={{ marginLeft: 40 }}
                      className="trackherf"
                      to={`/${item?.artists[0]?.type}/${item?.artists[0]?.id}`}
                    >
                      {item?.artists[0]?.name}
                    </Link>
                  </div>

                  <div className="trackDiv5">
                    <Link
                      className="trackherf"
                      to={`/${item?.album?.type}/${item.album.id}`}
                    >
                      {item?.album?.name}
                    </Link>
                  </div>
                  <div className="trackdivButton">
                    <button>
                      <GiSelfLove></GiSelfLove>
                    </button>
                  </div>
                  <div className="trackDiv6">
                    {millisToMinutesAndSeconds(item?.duration_ms)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {params?.type === "artist" && (
        <div className="artistDiv">
          {artist?.artists?.items?.map((item, index) => {
            return (
              <Link
                className="artistHerf"
                to={`/${item?.type}/${item?.id}`}
                key={index}
              >
                <div className="artistDiv1">
                  <img src={item?.images[0]?.url} alt=""></img>
                  <button>
                    <IoPlaySharp></IoPlaySharp>
                  </button>
                </div>
                <h1>{item?.name}</h1>
                <h1>{item?.type}</h1>
              </Link>
            );
          })}
        </div>
      )}
      {params?.type === "playlist" && (
        <div className="playlistDiv">
          {playlists?.playlists?.items?.map((item, index) => {
            return (
              <Link
                className="playlistHerf"
                to={`/${item?.type}/${item?.id}`}
                key={index}
              >
                <div className="playlistDiv1">
                  <img src={item?.images[0]?.url} alt=""></img>
                  <button>
                    <IoPlaySharp></IoPlaySharp>
                  </button>
                </div>
                <h1>{item?.name}</h1>
                <h1>{item?.type}</h1>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
