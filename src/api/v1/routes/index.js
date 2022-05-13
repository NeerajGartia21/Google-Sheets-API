const { Router } = require('express');
const { verifyToken } = require('../../../utils/jwt');
const router = Router();
const {googleAuth,fetchSheetData,updateData}=require('../controller')


router.get('/login',googleAuth);
router.get('/spreadsheet/:id',verifyToken,fetchSheetData);
router.post('/spreadsheet/update',verifyToken,updateData);

module.exports = router;