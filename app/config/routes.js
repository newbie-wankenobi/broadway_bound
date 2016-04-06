var express = require('express'),
    router = express.Router();

var ShowsCtrl = require('../controllers/shows'),
    UsersCtrl = require('../controllers/users');



router.post('/login',                              UsersCtrl.userAuth);
router.get('/users',                               UsersCtrl.usersAll);
router.post('/users',                              UsersCtrl.userCreate);
router.get('/users/:id',    UsersCtrl.tokenVerify, UsersCtrl.userShow);
router.put('/users/:id',    UsersCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users/:id', UsersCtrl.tokenVerify, UsersCtrl.userDelete);

router.get('/shows/:id',    UsersCtrl.tokenVerify, ShowsCtrl.showShow);
router.get('/shows',        UsersCtrl.tokenVerify, ShowsCtrl.showIndex);
router.post('/shows',       UsersCtrl.tokenVerify, ShowsCtrl.showCreate);
router.put('/shows/:id',    UsersCtrl.tokenVerify, ShowsCtrl.showUpdate);
router.delete('/shows/:id', UsersCtrl.tokenVerify, ShowsCtrl.showDelete);

module.exports = router;
