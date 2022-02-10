// const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// CRUD's

router.get('/post', adminController.getAddForm);
router.post('/post', adminController.postAddForm);

router.get('/', adminController.getAll);

router.get('/update/:id', adminController.getEditForm);
router.post('/update', adminController.postEditForm);

router.get('/delete/:id', adminController.getDeleteForm);
router.post('/delete', adminController.postDeleteForm);

module.exports = router;
