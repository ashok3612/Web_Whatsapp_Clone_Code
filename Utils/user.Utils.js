const { Router } = require("express");
const { getAllUsers, insertUser, getUserById, getSingleUser } = require("../Controllers/user.Controller");

const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/postUser', insertUser);
router.post('/getById', getUserById);
router.post('/getSingleUser', getSingleUser);

module.exports = router;