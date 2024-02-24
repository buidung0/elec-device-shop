const router = require("express").Router();
const ctrls = require("../controllers/services");

router.get("/", ctrls.getServices);

router.post("/", ctrls.createServices);

module.exports = router;
