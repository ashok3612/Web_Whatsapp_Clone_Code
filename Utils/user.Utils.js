const { Router } = require("express");
const { getAllUsers, insertUser, getUserById } = require("../Controllers/user.Controller");

const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/postUser', insertUser);
router.post('/getById', getUserById);

module.exports = router;