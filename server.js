const express = require("express");
const path = require("path");
const app = express();

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

app.use(connectLivereload());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

app.use("/", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
