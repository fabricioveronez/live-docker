var express = require('express');
var router = express.Router();

let isHealth = true;
let readTime = new Date(Date.now());
let isRead = () => { 
    return readTime < new Date(Date.now());
};

router.get('/read', (req, res) => {
   
    if (isRead()) {
        res.statusCode = 200;
        return res.send('Ok');
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
});

router.put('/unhealth', (req, res) => {

    isHealth = false;
    res.send("OK");
});

router.put('/unreadfor/:seconds', (req, res) => {
    
    const dado = new Date(new Date(Date.now()).getTime() + (1000 * req.params.seconds));
    readTime = dado;    
    res.send("OK");
});

var healthMid = function (req, res, next) {
    
    if (isHealth) {
        next();
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
};

exports.routers = router;
exports.middlewares = { healthMid};