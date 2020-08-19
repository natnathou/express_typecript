"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var MetadatasKeys_1 = require("./MetadatasKeys");
function use(midleware) {
    return function (target, key, desc) {
        var midlewares = Reflect.getMetadata(MetadatasKeys_1.MetadatasKeys.midleware, target, key) || [];
        Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.midleware, __spreadArrays(midlewares, [midleware]), target, key);
    };
}
exports.use = use;
