var bodyParser = require("body-parser");
var path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const hamlet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const xss = require("xss-clean");
const AuthRoutes = require("./routes/auth");
const PostRoutes = require("./routes/post");
const HomeRoutes = require("./routes/home");
var MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const livereload = require("connect-livereload");
const MONGODB_URI =
  "mongodb+srv://ammarlee:tonightwewilldoit@cluster0.j47ye.mongodb.net/onlineCourses";

var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json({ type: "application/*+json", inflate: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Auzhorization");
  next();
});
let cors = require("cors");
const socket = require("./socket");
app.use(hamlet());
app.use(morgan("dev"));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true, // enable set cookie
    exposedHeaders: ["set-cookie"],
  })
);
// SAVE THE SESSION IN THE DATABASE
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "mySessions",
});
app.use(
  session({
    secret: "This is a secret",
    name: "my test",
    cookie: {
      secure: false,
      maxAge: 30000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(require("connect-livereload")());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use(AuthRoutes);
app.use(PostRoutes);
// app.use(HomeRoutes);

const moment = require("moment");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // app.listen(3000);
    const server = app.listen(3000);
    const io = require("./socket").init(server);
    io.onlineUsersTwo = {};
    io.onlineMembers = []
    io.onlineClients = []

    io.on("connection", (socket) => {
      socket.on("hello", (da) => {
        socket.join(`${socket.id}`)
        socket.broadcast.emit("wlcome");
        io.to(`${socket.id}`).emit("myId",{socketId:socket.id});
      });
      socket.on("userLocation", (data) => {
        socket.broadcast.emit("userLocation",data);
      });
      // start new wat 
      socket.on("firstRoom", (data) => {
        console.log('first room',);
        // 1-join first room
        socket.join('adminsRoom')
        io.onlineMembers.push(socket.id)
        io.to(socket.id).emit("onlineInTheRoom",{action:'the onlin memebrs',onlineClients :io.onlineClients,onlineMembers:io.onlineMembers});
        console.log(io.onlineMembers);

        socket.broadcast.to('adminsRoom').emit('enter',{action:'admin',msg:'someone have enter the room as an admin ',
        onlineClients :io.onlineClients,onlineMembers:io.onlineMembers});

      });
     

      
      socket.on("sendRequest", (data) => {
        console.log(data);
        socket.join('adminsRoom')
        socket.join(`${data.roomId}`)
        let checkit = io.onlineClients.find(i=>{
          return i.roomId === data.roomId
        })
        if (checkit) {
          return
        }else{
          console.log('wwwww');

          io.onlineClients.push(data)
        }
        socket.broadcast.to('adminsRoom').emit('enter',{action:'client',msg:'someone have enter the room as an client ',data});

      });
      socket.on("acceptClient", (data) => {
        console.log(data.roomId);
        socket.join(`${data.roomId}`)
        socket.to(`${data.roomId}`).emit('allDone',{action:'client',msg:'you both are ready for chatting',data});
      });
      
      socket.on("sendTheMsg", (data) => {
        console.log(data);
        console.log(data.roomId);
        socket.to(`${data.roomId}`).emit('reciveMsg',{action:'client',msg:'reciveMsg msg ',data});
      });
      socket.on("Disableduser", (data) => {
        io.onlineClients = io.onlineClients.filter(i=>{
          return i.roomId !==data
        })
        socket.broadcast.to('adminsRoom').emit('deleteUser',data);
      });

      // end new way 
      
      socket.on("online", (data) => {
        io.onlineUsersTwo[data._id] = true;
        //  second step is
        socket.broadcast.emit("onlineUsers", data);

        socket.on("disconnect", () => {
          console.log('user is disconnected');

          io.onlineUsersTwo[data._id] = false;
          socket.broadcast.emit("offline", data);
        });
      });
      socket.on("disconnect", () => {
        socket.broadcast.emit("removeUserfromChat",socket.id);
        io.onlineClients = io.onlineClients.filter(i=>{
          return i.roomId !==socket.id
        })
        io.onlineMembers = io.onlineMembers.filter(i=>{
          return i !==socket.id
        })
        socket.to('adminsRoom').emit('deleteUser',socket.id);

        console.log('user is disconnected lol >?');
        console.log(socket.id);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
