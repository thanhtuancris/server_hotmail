const express = require('express');
const router = express.Router();
const hotmailController = require('../controller/hotmail.controller');
const middleware = require('../middleware/hotmail.middleware')
router.post('/add-hotmail', hotmailController.add_hotmail);
router.post('/get-hotmail',hotmailController.get_hotmail);

module.exports = router;
