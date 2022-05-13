const { Router } = require('express');
const { verifyToken } = require('../../../utils/jwt');
const router = Router();
const {googleAuth,fetchSheetData,updateData}=require('../controller')


router.get('/login',googleAuth);
//  the /login route is for fetching the access token from google
//  int the frontend the developer has to add this url as the callback url for the google auth client
router.get('/spreadsheet/:id',verifyToken,fetchSheetData);
router.post('/spreadsheet/update',verifyToken,updateData);

module.exports = router;