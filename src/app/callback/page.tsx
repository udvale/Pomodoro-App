"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      // Send the authorization code to the backend for token exchange
      fetch(`/callback?code=${code}`)
        .then(async (response) => {
          const textResponse = await response.text(); // Capture the raw response as text
          console.log("Raw response:", textResponse);

          try {
            const data = JSON.parse(textResponse); // Try to parse the JSON response
            if (data.access_token) {
              // Store the access token in localStorage
              window.localStorage.setItem("spotifyToken", data.access_token);
              // Redirect the user to the home page after successful authentication
              router.push("/");
            } else {
              console.error("No access token returned from the server");
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
        });
    } else {
      console.error("Authorization code not found");
    }
  }, [router]);

  return <div>Processing Spotify authentication...</div>;
};

export default Callback;
