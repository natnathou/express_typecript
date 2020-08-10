"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = express_1.default.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n  <form method=\"Post\">\n    <div>\n      <label>Email</label>\n      <input name=\"email\" />\n    </div>\n    <div>\n      <label>Password</label>\n      <input name=\"password\" type=\"password\"  autocomplete=\"on\"/>\n    </div>\n    <button>Submit</button>\n  </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === 'ne.zaffran@gmail.com' &&
        password === '1') {
        req.session = { loggedIn: true };
        res.redirect('/protected');
    }
    else {
        res.send("Invalid email or password");
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n      <div>You are logged in</div>\n      <a href=\"/logout\">Logout</a>\n    </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>Please logged in</div>\n      <a href=\"/login\">Login</a>\n    </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Protected');
});
