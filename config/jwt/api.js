// Imports
const {getUserPerUsername} = require("../../queries/api/user.queries")
let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'a2463gd421-b7j98-4h70a-b4ee-fd23783ec69d';

// Exported functions
module.exports = {
    generateTokenForUser: user =>
        jwt.sign({
                username: user.username
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '24h'
            })
    ,
    parseAuthorization: authorization =>
        (authorization != null) ? authorization.replace('Bearer ', '') : null
    ,
    getUser: async authorization => {
        let user = null;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    user = await getUserPerUsername(jwtToken.username)
            } catch (e) {
                // console.log({e})
            }
        }
        return user;
    }
}
