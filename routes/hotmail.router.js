const express = require('express');
const router = express.Router();
const hotmailController = require('../controller/hotmail.controller');
const middleware = require('../middleware/hotmail.middleware')
router.post('/add-hotmail-2fa', middleware.add_hotmail2fa, hotmailController.add_hotmail_2fa);
router.post('/add-hotmail-new', hotmailController.add_hotmail_new);
router.post('/add-list-hotmail', hotmailController.add_list_hotmail);
router.post('/get-hotmail-new',hotmailController.get_hotmail_new);
router.post('/get-hotmail-2fa',hotmailController.get_hotmail_2fa);
router.post('/update-hotmail',hotmailController.update_hotmail);
router.post('/hotmail-analyst', hotmailController.hotmail_analyst);
router.post('/test', hotmailController.test);

module.exports = router;
