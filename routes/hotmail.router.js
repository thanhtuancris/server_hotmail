const express = require('express');
const router = express.Router();
const hotmailController = require('../controller/hotmail.controller');
const middleware = require('../middleware/hotmail.middleware')
router.post('/add-hotmail', middleware.add_hotmail, hotmailController.add_hotmail);
router.post('/add-hotmail-white', hotmailController.add_hotmail_white);
router.post('/add-list-hotmail', hotmailController.add_list_hotmail);
router.post('/get-hotmail',hotmailController.get_hotmail);
router.post('/update-hotmail',hotmailController.update_hotmail);
router.post('/hotmail-analyst', hotmailController.hotmail_analyst);

module.exports = router;
