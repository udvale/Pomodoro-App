import {useEffect, useState} from "react";

const SpotifyAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extract token from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      // Store the access token in localStorage or session storage
      window.localStorage.setItem("spotifyToken", accessToken);
      setToken(accessToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("spotifyToken");
  };

  const handleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/callback"; // Ensure this matches Spotify Dashboard
    const AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";
    const RESPONSE_TYPE = "code";
    const SCOPES = "user-read-private user-read-email";

    // Build Spotify login URL
    const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    window.location.href = authURL; // Redirect to Spotify login
  };

  return (
    <div>
      {!token ? (
        <button onClick={handleLogin}>Connect with Spotify</button>
      ) : (
        <div>
          <p>Logged in with token: {token}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default SpotifyAuth;
