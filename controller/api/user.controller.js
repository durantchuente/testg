const jwt = require("../../config/jwt/api");

const {updateUserImage, updateUPassword, updateU, updateUserStatus, getUserPerUsername, createUser, deleteUser, getAllUsers, searchUsersPerUsername, getUserPerId} = require('../../queries/api/user.queries')
//const {firebaseSaveFile, firebaseDeleteFile}=require('../middlewares/upload_firebase.js')
exports.create = async (req, res) => {
    const body = req.body;
    //console.log(body)
    if (body.username && body.password) {
        let user = await getUserPerUsername(body.username)
        if (!user) {
                const userC=await createUser(body)
            res.status(200).json({success: true, msg: `User ${userC.username} create successfully`, userC})
        } else {
            res.json({success: false, msg: `User exist`});
        }

    }
}

exports.updateUserPassword = async (req, res) => {
    const body = req.body;
    if (body) {
        let user = await getUserPerId(req.params.id)
        if (user) {
            await updateUPassword(req)
            res.json({success: true, msg: `User password update with success`});
        } else {
            res.json({success: false, msg: `User not exist`});
        }
    }
}
exports.updateUser = async (req, res) => {
    const body = req.body;
    if (body) {
        let user = await getUserPerId(req.params.id)
        const token =res.locals.user.token
        if (user) {
            await updateU(req)
            req.login(token)
            console.log("up")
            console.log(req.user)
            console.log(res.locals.user)
            res.json({success: true, msg: `User update with success`});
        } else {
            res.json({success: false, msg: `User not exist`});
        }
    }
}
exports.updateStatus = async (req, res) => {
    const body = req.body;
    if (body) {
        let user = await getUserPerId(req.params.id)
        if (user) {
            await updateUserStatus(req)
            res.json({success: true, msg: `User update status with success`});
        } else {
            res.json({success: false, msg: `User status not exist`});
        }

    }
}

exports.getUserPerName = async (req, res) => {
    const body = req.params;
    if (body) {
        let user = await getUserPerUsername(body.name)
        if (user) {
            res.json({success: true, "data": user});
        } else {
            res.json({success: false, msg: `user not exist`});
        }
    }
}

exports.Profile = async (req, res) => {
        if (req.user) {
            res.json({success: true, data: req.user});
        } else {
            res.json({success: false, msg: `user not exist`});
        }
}

exports.search = async (req, res) => {
    const body = req.body;
    if (body) {
        let search = await searchUsersPerUsername(body.name)
        if (search) {
            res.json({success: true, search});
        } else {
            res.json({success: false, msg: `search not exist`});
        }
    }
}

exports.getUserPerId = async (req, res) => {
    const body = req.params;
    if (body) {
        let user = await getUserPerId(body.id)
        if (user) {
            res.json({success: true, user});
        } else {
            res.json({success: false, msg: `user not exist`});
        }

    }
}

exports.updateImage = async (req, res) => {
    req.body.imageName=req.files && req.files['picture'] ? req.files['picture'][0].filename : null
    const body = req.params;
    if (body) {
        let user = await getUserPerId(body.id)
        if (user) {
            //req.body.url = await firebaseSaveFile(req.files['picture'][0], 'housing', req.body.imageName)
            await updateUserImage(req)
            res.json({success: true, msg: `User update with success`});
        } else {
            res.json({success: false, msg: `User not exist`});
        }

    }
}
exports.login = async (req, res) => {
    const body = req.body;
    if (body.username && body.password) {
        let user = await getUserPerUsername(body.username)
        //console.log("log")
        if (user) {
            const compare = await user.comparePassword(body.password)
            if (compare) {
                return res.status(200).json({
                    success: true,
                    message: "Auth successful",
                    token: jwt.generateTokenForUser(user),
                    user: user
                });
                //res.json({success: true, msg: `User is connected`});
            } else {
                res.json({success: false, msg: `Username or login incorrect`});
            }
        } else {
            res.json({success: false, msg: `Username or login incorrect`});
        }

    }
}
exports.getAllUser = async (req, res) => {
    try{
        let users = await getAllUsers()
        res.json(users)
    }catch (e) {
        console.log({e})
    }

}

exports.deleteUser = async (req, res) => {
    const body = req.params;
    if (body) {
        let user = await getUserPerId(body.id)
        if (user) {
            await deleteUser(user._id)
            res.json({success: true, msg: `User deleted with success`});
        } else {
            res.json({success: false, msg: `User not exist`});
        }

    }
}
// db.user.find().Count()+1
