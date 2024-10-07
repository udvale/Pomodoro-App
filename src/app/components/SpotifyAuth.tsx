import React, {useEffect, useState} from "react";

// Environment variables for Spotify
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URL =
  process.env.REDIRECT_URL || "http://localhost:3000/callback"; // Define in .env.local
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-read-private user-read-email"; // Add more scopes as needed

const SpotifyAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      if (token) {
        window.localStorage.setItem("token", token);
        setToken(token);
        window.location.hash = ""; // Clear the hash
      }
    } else {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (
        <a
          className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URL
          )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
            SCOPES
          )}`}
        >
          Connect with Spotify
        </a>
      ) : (
        <button
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
          onClick={logout}
        >
          Logout from Spotify
        </button>
      )}
    </div>
  );
};

export default SpotifyAuth;
