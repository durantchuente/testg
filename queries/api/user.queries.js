const User = require ('../../models/User')

exports.createUser = async admin =>{
    const user =new User({
        'username': admin.username,
        'password': await User.hashPassword(admin.password),
        'email': admin.email,
        'tel': admin.tel,
        'userType': admin.userType
    })
    //console.log(user)
    return user.save()
}
exports.updateUserImage = async req => {
    return  User.findByIdAndUpdate(req.params.id, {url:req.body.url, imageName:req.body.imageName}
    )
}

exports.updateUserStatus = async req => {
    return  User.updateOne(
        {_id: req.params.id},
        {$set: {status:req.body.status}}
    )
}

exports.updateU = async req => {
    return User.findByIdAndUpdate(req.params.id, {username: req.body.username, email: req.body.email, tel:req.body.tel}
    )
}
exports.updateUPassword = async req => {
    return  User.findByIdAndUpdate(req.params.id, {password: await User.hashPassword(req.body.password)}
    )
}


exports.getUserPerUsername = username => {
    return User.findOne ({username: username}).exec ()
}

exports.searchUsersPerUsername = search => {
    const regExp = `^${search}`
    const reg = new RegExp (regExp)
    return User.find ({username: {$regex: reg}}).exec ()
}

exports.getAllUsers = async () => {
    return User.find()
        //.populate('products').exec ()
}

exports.getAllAdmins = () => {
    return User.find ({userType : 'admin'}).exec ()
}
exports.deleteUser = async id => {
    return User.findByIdAndDelete(id)
}
exports.getUserPerId = async id => {
    return User.findById (id).populate('products').exec ()
}
exports.addHousingIdToUser = (UserId, HousingId) =>
    User.findByIdAndUpdate(UserId, {$push: {products: HousingId}}).exec()

exports.removeHousingIdToUser = (UserId, HousingId) =>
    User.findByIdAndUpdate(UserId, {$pull: {products: HousingId}}).exec()

// exports.addMessageIdToUser = (UserId, MessageId) =>
//     User.findByIdAndUpdate(UserId, {$push: {messages: MessageId}}).exec()
//
// exports.removeMessageIdToUser = (UserId, MessageId) =>
//     User.findByIdAndUpdate(UserId, {$pull: {messages: MessageId}}).exec()
