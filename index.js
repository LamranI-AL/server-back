const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("./Model/MessageModel");
const cors = require("cors");
const EventModel = require("./Model/EventModel");

// creat server
const app = express();

// donner acces a port 5173
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // pour parser les données envoyées dans le body
// CONNECT TO DB
const userName = "lamraniotman";
const password = process.env.PASSWORD;
// const password = "lamraniotman000";
const database = "QuarkDb";
mongoose.connect(
  `mongodb+srv://lamraniotman:lamraniotman000@quark.yu70cdd.mongodb.net/QuarkDb?retryWrites=true&w=majority`
);
app.get("/", async (req, res) => {
  const message = "hello my friends";
  res.json(message);
});
//get les message et lea utulisateur men db

app.get("/message", async (req, res) => {
  const message = await MessageModel.find();
  res.json(message);
});

app.get("/event", async (req, res) => {
  const event = await EventModel.find();
  res.json(event);
});

//creat user
app.post("/CreatMessage", async (req, res) => {
  const user = req.body;
  const NewUser = new MessageModel(user);
  await NewUser.save();
  res.json(user);
});
// LISTEN
app.listen("3001", () => {
  console.log(" Server is running on port 3001");
});
module.exports = app;
