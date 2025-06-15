const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const { PORT, DB_PASSWORD, DB_USER } = require("./config");
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");
const reserveRoutes = require("./routing/reserve");
const eventsRoutes = require("./routing/events");
const { STATUS_CODE } = require("./constants/statusCode");
const { MENU_LINKS } = require("./constants/navigation");
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");

const app = express();

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fpa9j9a.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(getFileFromAbsolutePath("public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/events", eventsRoutes);
app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use("/", homeRoutes);
app.use("/", reserveRoutes);

app.use((request, response) => {
  response.status(STATUS_CODE.NOT_FOUND).render("404", {
    headTitle: "404",
    menuLinks: MENU_LINKS,
    activeLinkPath: "",
  });
});

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
