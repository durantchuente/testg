let mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema=mongoose.Schema

const UserSchema = schema({
        username: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false,
            unique: true
        },
        tel: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            required: false
        },
        imageName: {
            type: String,
            required: false
        },
        userType: {
            type: String,
            enum:['super-admin', 'admin','seller', 'customer', 'premium'],
            default: 'customer',
            required: true
        },
        status:{
            type:String,
            enum:['enable', 'disabled','suspended'],
            default: 'enable'
        }
        // products: [{
        //     type: schema.Types.ObjectId,
        //     ref: "Products"
        // }]
    },
    {
        timestamps: true
    })
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}
UserSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    } catch (e) {
        throw e
    }
}

module.exports = mongoose.model('Users', UserSchema)
