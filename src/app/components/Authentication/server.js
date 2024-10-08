// server.js
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config(); // To load environment variables

const app = express();

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const tokenResponse = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const {access_token, refresh_token} = tokenResponse.data;

    // Send the tokens back to the frontend
    res.json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error.response.data);
    res
      .status(500)
      .send("Failed to exchange authorization code for access token");
  }
});

// Server listening on port 3001
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
