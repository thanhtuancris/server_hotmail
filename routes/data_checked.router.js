const express = require('express');
const router = express.Router();
const dataController = require('../controller/data_checked.controller');
const middleware = require('../middleware/data.middleware')
router.post('/add-data-checked', middleware.add_data_checked, dataController.add_data);
router.post('/get-data-checked',dataController.get_data);
router.post('/get-bin',dataController.get_bin);
router.post('/get-nation',dataController.get_nation);

module.exports = router;
