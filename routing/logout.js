const express = require("express");

const logoutController = require("../controllers/logoutController");

const router = express.Router();

router.get("/", logoutController.getLogoutView);

module.exports = router;