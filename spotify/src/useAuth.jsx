import axios from "axios";
import { useEffect, useState } from "react";

const code = new URLSearchParams(window.location.search).get("code");

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    if (code)
      axios
        .post("http://localhost:5000/login", { code: code })
        .then((r) => {
          setAccessToken(r.data.accessToken);
          setExpiresIn(r.data.expiresIn);
          setRefreshToken(r.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          /* window.location.replace("/"); */
        });
  }, []);

  return accessToken;
}
