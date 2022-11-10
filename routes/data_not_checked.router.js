const express = require('express');
const router = express.Router();
const dataController = require('../controller/data_not_checked.controller');
const middleware = require('../middleware/data.middleware')
router.post('/add-data-not-checked', dataController.add_data);
router.post('/get-data-not-checked',dataController.get_data);
router.post('/add-list-data-not-checked',dataController.addListData);

module.exports = router;
