// const express = require('express');
// const app = express();
const {getProfile} = require("../../queries/user.queries");
let {app} = require("../../server");

const extractUserFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            let user = await getProfile(req);
            if (user.data.success) {
                req.user = user.data;
                app.locals.user = user.data.data
            } else {
                res.clearCookie("jwt");
            }
        } else {
            res.clearCookie("jwt");
        }
    } catch (e) {
        console.log({e})
    }
    next();
};

const addJwtFeatures = (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.logout = () => res.clearCookie("jwt");
    req.login = (token) => {
        res.cookie("jwt", token);
    };
    next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
