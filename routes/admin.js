const express = require("express");

const adminController =require("../controllers/admin");

const router = express.Router();

router.get("/add-movie", adminController.GetAddMovie);

router.post("/add-movie", adminController.PostAddMovie);

router.get("/movies", adminController.GetAdminMovie);

router.get("/edit-movie/:movieId", adminController.GetEditMovie);
router.post("/edit-movie", adminController.PostEditMovie);

router.post("/delete-movie", adminController.DeleteMovie);

module.exports = router;