const express = require("express");
const ingAndInsController = require("../controller/ingredAndInstructionController");
const router = express.Router();

router.route("/").get(ingAndInsController.ingInsReturn);

// router.route('/')
// .get(authController.protect,ingAndInsController.ingInsReturn)
module.exports = router;
