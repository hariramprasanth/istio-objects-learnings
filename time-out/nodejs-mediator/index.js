const express = require("express");
const axios = require("axios");

const app = express();
const port = 80;

app.use(express.json());

app.post("/make-api-call", async (req, res) => {
  try {
    const requestData = req.body;
    console.log("Request Body:", requestData);

    const headers = {
      Host: requestData.host,
    };

    const url = "http://" + requestData.host + "/sleep/" + requestData.period;
    console.log(url);
    const response = await axios.get(url, { headers });
    console.log("Response Data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error making API call:", error.message);
    res.status(500).json({ error: "Internal Server Error:" + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
