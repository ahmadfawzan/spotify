import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Info.css";
export default function Info() {
  const params = useParams();

  const spotify = useSelector((state) => {
    return state.getAccessToken;
  });
  const [playlist, setPlaylist] = useState(null);
  const [Album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [track, setTrack] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(false);
  const dataForDisplay = expanded ? track?.tracks : track?.tracks?.slice(0, 5);
  useEffect(() => {
    if (spotify) {
      params.type === "playlist"
        ? spotify.getPlaylist(params.id).then(
            function (data) {
              setPlaylist(data.body);
              setAlbum(null);
              setArtist(null);
              setTrack(null);
            },
            function (err) {
              console.log("Something went wrong!", err);
            }
          )
        : params.type === "album"
        ? spotify.getAlbum(params.id).then(
            function (data) {
              setAlbum(data.body);
              setPlaylist(null);
              setArtist(null);
              setTrack(null);
            },
            function (err) {
              console.error(err);
            }
          )
        : params.type === "artist"
        ? spotify.getArtist(params.id).then(
            function (data) {
              setArtist(data.body);
              setPlaylist(null);
              setAlbum(null);
              setTrack(null);
              spotify.getArtistTopTracks(params.id, "JO").then(
                function (data) {
                  setTrack(data.body);
                },
                function (err) {
                  console.log("Something went wrong!", err);
                }
              );
            },
            function (err) {
              console.error(err);
            }
          )
        : params.type === "track"
        ? spotify.getTrack(params.id).then(
            function (data) {
              setAlbum(null);
              setPlaylist(null);
              setArtist(null);
              setTrack(data.body);
            },
            function (err) {
              console.log("Something went wrong!", err);
            }
          )
        : console.log("go to hill man");
    }
  }, [spotify, params]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  /* console.log(playlist?.tracks);
  console.log(Album);
  console.log(artist);
  console.log(track); */

  return playlist ? (
    <div className="playlist">
      <div className="playlist1">
        <img src={playlist?.images[0]?.url} alt=""></img>
      </div>
      <div className="playlist2">
        {" "}
        <h1>{playlist?.type}</h1>
        <h2>{playlist?.name}</h2>
        <h3>{playlist?.description}</h3>
      </div>
      <div className="playlist3">
        <div className="playlist4">
          <div className="playlist5">
            <h1>#</h1>
            <h1 style={{ marginLeft: 10 }}>TITLE</h1>
          </div>
          <h1>ALBUM</h1>

          <h1 style={{ marginRight: 14 }}>Time</h1>
        </div>
        {playlist?.tracks?.items?.map((item, index) => {
          return (
            <div key={index} className="playlist6">
              <div className="playlist7">
                <div className="playlist8">
                  {index + 1}{" "}
                  <img src={item?.track?.album?.images[0]?.url} alt=""></img>
                  <div className="playlist9">
                    <div className="playlist10">
                      {name ? (
                        <span>
                          {item?.track?.name.length > 15 ? (
                            <span>
                              <Link
                                to={`/${item?.track?.type}/${item?.track?.id}`}
                              >
                                {item?.track?.name}
                              </Link>
                              <span onClick={() => setName(false)}>...</span>
                            </span>
                          ) : (
                            <Link
                              to={`/${item?.track?.type}/${item?.track?.id}`}
                            >
                              {item?.track?.name}
                            </Link>
                          )}
                        </span>
                      ) : (
                        <span>
                          {item?.track?.name?.length > 15 ? (
                            <span>
                              <Link
                                to={`/${item?.track?.type}/${item?.track?.id}`}
                              >
                                {item?.track?.name?.slice(0, 14)}
                              </Link>
                              <span onClick={() => setName(true)}>...</span>
                            </span>
                          ) : (
                            <Link
                              to={`/${item?.track?.type}/${item?.track?.id}`}
                            >
                              {item?.track?.name}
                            </Link>
                          )}
                        </span>
                      )}

                      <Link
                        to={`/${item?.track?.artists[0]?.type}/${item?.track?.artists[0]?.id}`}
                      >
                        {item?.track?.artists[0]?.name}
                      </Link>
                    </div>

                    <Link
                      to={`/${item?.track?.album?.type}/${item?.track?.album?.id}`}
                    >
                      {item?.track?.album?.name}
                    </Link>
                  </div>
                </div>

                <div>{millisToMinutesAndSeconds(item?.track?.duration_ms)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : Album ? (
    <div className="Album">
      <div className="Album1">
        <img src={Album?.images[0]?.url} alt=""></img>
        <div className="Album2">
          <h1> {Album?.album_type}</h1>

          <h2>{Album?.name}</h2>
          <div className="Album3">
            <img src={Album?.images[0]?.url} alt=""></img>
            <Link to={`/${Album?.artists[0]?.type}/${Album?.artists[0]?.id}`}>
              <h3>{Album?.artists[0]?.name}</h3>
            </Link>
          </div>
        </div>
      </div>
      <div className="Album4">
        <div className="Album5">
          <div className="Album6">
            <h1>#</h1>
            <h1 style={{ marginLeft: 10 }}>TITLE</h1>
          </div>

          <h1 style={{ marginRight: 14 }}>Time</h1>
        </div>
        {Album?.tracks.items?.map((item, index) => {
          return (
            <div key={index} className="Album7">
              <div className="Album8">
                <div className="Album9">
                  {index + 1}
                  <div className="Album10">
                    <Link to={`/${item?.type}/${item?.id}`}>{item?.name}</Link>
                    <div className="Album11">
                      <Link
                        to={`/${item.artists[0]?.type}/${item.artists[0]?.id}`}
                      >
                        {item?.artists[0]?.name}
                      </Link>
                      <Link
                        style={{ marginLeft: 10 }}
                        to={`/${item.artists[1]?.type}/${item.artists[1]?.id}`}
                      >
                        {item?.artists[1]?.name}
                      </Link>
                    </div>
                  </div>
                </div>

                <div>{millisToMinutesAndSeconds(item?.duration_ms)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : artist ? (
    <div className="artist">
      <div className="artist1">
        <img src={artist?.images[0]?.url} alt=""></img>
      </div>
      <div className="artist2">
        {" "}
        <h1>{artist?.type}</h1>
        <h2>{artist?.name}</h2>
        <div className="artist3">
          <h1>
            {artist?.followers.total.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </h1>
          <h1 style={{ marginLeft: 7 }}>followers</h1>
        </div>
      </div>

      <div className="artist4">
        <div className="artist5">
          <h1>Popular</h1>
          {dataForDisplay?.map((item, index) => {
            return (
              <div key={index} className="artist6">
                <div className="artist7">
                  <h1>{index + 1}</h1>

                  <img src={item?.album?.images[0]?.url} alt=""></img>

                  <h1>{item?.name}</h1>
                </div>
                <h1>{millisToMinutesAndSeconds(item?.duration_ms)}</h1>
              </div>
            );
          })}
          <button type="button" onClick={() => setExpanded(!expanded)}>
            {track?.tracks?.length > 5 &&
              (expanded ? " Show Less" : "Show More")}
          </button>
        </div>
        <div className="artist8">
          <h1>Artist pick</h1>
          <div className="artist9">
            <img src={track?.tracks[0]?.album?.images[0]?.url} alt=""></img>
            <div className="artist10">
              <h1>Posted By {track?.tracks[0]?.artists[0]?.name}</h1>{" "}
              <Link
                to={`/${track?.tracks[0]?.album?.type}/${track?.tracks[0]?.album?.id}`}
              >
                {track?.tracks[0]?.artists[0]?.name}:{" "}
                {track?.tracks[0]?.album?.name}
              </Link>
              <h1 style={{ marginLeft: -48 }}>
                {" "}
                {track?.tracks[0]?.album?.type}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : track ? (
    <div className="track">
      <div className="track1">
        <img src={track?.album?.images[0]?.url} alt=""></img>
        <div className="track2">
          <h1> {track?.type}</h1>

          <h2>{track?.name}</h2>
          <div className="track3">
            <img src={track?.album?.images[0]?.url} alt=""></img>

            <Link to={`/${track?.artists[0]?.type}/${track?.artists[0]?.id}`}>
              <h3>{track?.artists[0]?.name}</h3>
            </Link>
            <h1>{millisToMinutesAndSeconds(track?.duration_ms)}</h1>
          </div>
        </div>
      </div>
      <div className="track4">
        <img src={track?.album.images[0]?.url} alt=""></img>
        <div className="track5">
          <h1>{track?.artists[0]?.type}</h1>
          <Link to={`/${track?.artists[0]?.type}/${track?.artists[0]?.id}`}>
            {track?.artists[0]?.name}
          </Link>
        </div>
      </div>

      <div className="track6">
        <div className="track7">
          <h1>1</h1>
          <img src={track.album.images[0]?.url} alt=""></img>
          <h1>{track?.name}</h1>
        </div>

        <h1>{millisToMinutesAndSeconds(track?.duration_ms)}</h1>
      </div>
    </div>
  ) : (
    console.log("No Data")
  );
}
