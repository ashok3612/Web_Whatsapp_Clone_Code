const { Router } = require("express");
const { getAllFriends,addFriendToList } = require("../Controllers/support.Controller");
const router = Router();

router.post('/getAllFriends', getAllFriends);
router.post('/addFriendToList', addFriendToList);

module.exports = router;