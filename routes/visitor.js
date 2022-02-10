// const path = require('path');

const express = require('express');

const visitorController = require('../controllers/visitor');

const router = express.Router();

// CRUD's

router.get('/', visitorController.getAll);

module.exports = router;
