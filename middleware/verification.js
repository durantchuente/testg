const jwt = require("../config/jwt/api");
exports.isConnected = async (req, res, next) => {
    try {
        const user = await jwt.getUser(req.headers['authorization'])
        if (user) {
            res.locals.user = user
            req.user = user
            next()
        } else {
            res.json({success: false, msg: "You are not connected"})
        }
    } catch (error) {
        res.clearCookie("jwt")
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

exports.isConnectedFtd = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next()
        } else {
            console.log("mouf")
            res.redirect('/login')
        }
    } catch (error) {
        console.log("erreur")
        res.redirect('/login')
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (["super-admin", "admin"].includes(res.locals.user.userType)){
            next();
        }else{
            return res.status(401).json({
                message: 'Vous n\'etes pas authoriser a faire cette operation'
            });
        }
    } catch (error) {
        res.clearCookie("jwt")
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

exports.isSeller = (req, res, next) => {
    try {
        if (res.locals.user.userType==='seller'){
            next();
        }else{
            return res.status(401).json({
                message: 'Vous n\'etes pas authoriser a faire cette operation'
            });
        }
    } catch (error) {
        res.clearCookie("jwt")
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
// exports.isSuperAdmin = (req, res, next) => {
//     try {
//         if (req.user.userType=="super-admin" || req.body.userType=="customer" || req.body.userType=="seller"){
//             next();
//         }else{
//             return res.status(401).json({
//                 message: 'Vous etes pas authoriser a faire cette operation'
//             });
//         }
//     } catch (error) {
//         res.clearCookie("jwt")
//         return res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// };

exports.LawUserCreate = async (req, res, next) => {
    try {
        if (res.locals.userType==='super-admin'){
            if(req.body.userType==='admin'){
                await isConnected(req)
                next();
            }else{
                return res.status(401).json({
                    success:false,
                    msg: 'Vous etes pas authoriser a faire cette operation'
                });
            }
        }else{
            if(res.locals.userType==='admin'){
                if(["super-admin", "admin"].includes(req.body.userType)){
                    return res.status(401).json({
                        success:false,
                        msg: 'Vous etes pas authoriser a faire cette operation'
                    });
                }
                }else{
                    next()
            }
        }
    } catch (error) {
        res.clearCookie("jwt")
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
exports.isSuperAdmin = (req, res, next) => {
    try{
        if (res.locals.userType==='super-admin'){ next()} else{ return res.status(401).json({message: 'Auth failed'});}
    }catch (e) {
        console.log({e})
    }
}
