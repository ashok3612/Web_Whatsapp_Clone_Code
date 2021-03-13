const { Router } = require("express");
const { getEndToEndChat, saveChatToDB, getLastChat } = require("../Controllers/chat.Controller");

const router = Router();

router.post('/saveChat', saveChatToDB);
router.post('/getChats', getEndToEndChat);
router.post('/getLastChat', getLastChat)

module.exports = router;