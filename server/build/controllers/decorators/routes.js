"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.put = exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadatasKeys_1 = require("./MetadatasKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.path, path, target, key);
            Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.method, method, target, key);
        };
    };
}
exports.routeBinder = routeBinder;
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.put = routeBinder(Methods_1.Methods.put);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.del = routeBinder(Methods_1.Methods.del);
