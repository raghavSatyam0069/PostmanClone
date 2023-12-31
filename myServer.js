let express = require("express");
const cors = require("cors");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.port || 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let axios = require("axios");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.post("/myServer/allRequests", async (req, res) => {
  let token = req.header("authorization");
  let body = req.body;
  console.log(body);
  if (body.headerKey1 === "Authorization") token = body.headerValue1;
  if (body.headerKey2 === "Authorization") token = body.headerValue2;
  if (body.headerKey3 === "Authorization") token = body.headerValue3;
  try {
    if (body.method === "GET") {
      let response = await axios.get(body.fetchURL, {
        headers: { authorization: token },
      });
      // console.log(response.data);
      res.send(
        typeof response.data === "number" ? "" + response.data : response.data
      );
    } else if (body.method === "POST") {
      let response = await axios.post(body.fetchURL, body.data, {
        headers: { authorization: token },
      });
      console.log(
        typeof response.data === "number" ? "" + response.data : response.data
      );
      res.send(
        typeof response.data === "number" ? "" + response.data : response.data
      );
    } else if (body.method === "PUT") {
      let response = await axios.put(body.fetchURL, body.data, {
        headers: { authorization: token },
      });
      console.log(
        typeof response.data === "number" ? "" + response.data : response.data
      );
      res.send(
        typeof response.data === "number" ? "" + response.data : response.data
      );
    } else if (body.method === "DELETE") {
      let response = await axios.delete(body.fetchURL, body.data, {
        headers: { authorization: token },
      });
      console.log(
        typeof response.data === "number" ? "" + response.data : response.data
      );
      res.send(
        typeof response.data === "number" ? "" + response.data : response.data
      );
    }
  } catch (ex) {
    if (ex.response) {
      console.log(ex.response);
      let { status, statusText } = ex.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else {
      res.status(404).send(ex);
    }
  }
});
