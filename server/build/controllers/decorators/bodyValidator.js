"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
var MetadatasKeys_1 = require("./MetadatasKeys");
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.validator, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
