const router = require("express").Router();

const { add } = require("../controllers/purchase-controller");

router.post("/add", add);

module.exports = router;
