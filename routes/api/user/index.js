const router = require('express').Router()
const {isAdmin, isConnected, LawUserCreate, isSuperAdmin} = require('../../../middleware/verification');
const {getAllUser, Profile, updateUserPassword, updateStatus, deleteUser, updateImage, search, getUserPerId, getUserPerName, create, updateUser, login} = require('../../../controller/api/user.controller')
// const upload = require('./../../../uploads/upload').uploads
// const runUpload = upload.fields([
//     {
//         name: 'picture',
//         maxCount: 1
//     }
// ])

router.post('/create', LawUserCreate, create)
router.post('/update/:id', isConnected, updateUser)
router.post('/updateImage/:id', isConnected, updateImage)
router.post('/updatePassword/:id', isConnected, updateUserPassword)
router.post('/updateStatus/:id', isConnected, isAdmin, updateStatus)
router.post('/login', login)
router.get('/getProfile',isConnected, Profile)
router.get('/getAll', getAllUser)
router.get('/getUser/:id', getUserPerId)
router.get('/getUserPerName/:name', getUserPerName)
router.post('/search', search)
router.get('/delete/:id', isConnected, isSuperAdmin, deleteUser)

module.exports = router
