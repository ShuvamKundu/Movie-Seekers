const express = require("express");
// require("dotenv/config");
const BodyParser = require("body-parser");
// const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 9090;

app.use(BodyParser.json());

// import routes
const Movie_Data = require("./routes/movie_data");
const Admin = require("./routes/admin");

// use routes
app.use("/movie_data", Movie_Data);
app.use("/admin", Admin);

// connect database

// CHOOSE ANY ONE

// FOR OFFLINE MONGODB (LOCAL)
// mongoose.connect(
//   process.env.MONGO_DB_LOCAL_PATH,

//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     if (err) console.log(err);

//     console.log("database connected");
//   }
// );
// FOR ONLINE MONGODB (ATLAS)
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CHOOSE ANY ONE

// server listen on port

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// server side code

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
