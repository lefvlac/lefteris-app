const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authentication = require("./routes/auth");
const employers = require("./routes/employers");

dotenv.config({ path: ".env" });
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

app.use("/api/auth", authentication);
app.use("/api/employers", employers);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname), "frontend/build/index.html");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`.cyan.bold);
});
