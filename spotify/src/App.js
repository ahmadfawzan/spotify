import "./App.css";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { useEffect /* useState */ } from "react";
import {
  BrowserRouter,
  Route,
  Routes /* useNavigate */,
} from "react-router-dom";
import Login from "./components/Login/Login";
/* import { useSelector } from "react-redux"; */
import Home from "./components/Home/Home";
import { get_accessToken, get_user } from "./redux/actionTypes";
import HeaderUp from "./components/HeaderUp/HeaderUp";
import Info from "./components/Info/Info";

import LeftNav from "./components/LeftNav/LeftNav";
import Search from "./components/Search/Search";
import Mp3Track from "./components/Mp3Track/Mp3Track";

var spotifyApi = new SpotifyWebApi({
  clientId: "d21f60853815421fafe2c201cdcb0304",
  clientSecret: "7e9890b75e7646e78e58a3e969413a0c",
  redirectUri: "http://localhost:3000",
});

function App() {
  const token = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      dispatch({
        type: get_accessToken.type,
        spotify: spotifyApi,
      });
      spotifyApi.getMe().then(
        function (user) {
          dispatch({
            type: get_user.type,
            user: user.body,
          });
        },

        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        {token ? (
          <div>
            <HeaderUp></HeaderUp>
            <LeftNav></LeftNav>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/:type/:id" element={<Info></Info>}></Route>
              <Route path="/Search" element={<Search></Search>}></Route>
              <Route path="/Search/:search" element={<Search></Search>}></Route>
              <Route
                path="/Search/:search/:type"
                element={<Search></Search>}
              ></Route>
            </Routes>
            <Mp3Track></Mp3Track>
          </div>
        ) : (
          <Login></Login>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
