"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var tools_1 = require("@iconify/tools");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var iconSet, exported;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, tools_1.importDirectory)('./icons', {
                    prefix: 'custom'
                })];
            case 1:
                iconSet = _a.sent();
                // Validate, clean up, fix palette and optimise
                iconSet.forEach(function (name, type) {
                    if (type !== 'icon') {
                        return;
                    }
                    var svg = iconSet.toSVG(name);
                    if (!svg) {
                        // Invalid icon
                        iconSet.remove(name);
                        return;
                    }
                    // Clean up and optimise icons
                    try {
                        // Clean up icon code
                        (0, tools_1.cleanupSVG)(svg);
                        // Assume icon is monotone: replace color with currentColor, add if missing
                        // If icon is not monotone, remove this code
                        (0, tools_1.parseColors)(svg, {
                            defaultColor: 'currentColor',
                            callback: function (attr, colorStr, color) {
                                return !color || (0, tools_1.isEmptyColor)(color) ? colorStr : 'currentColor';
                            }
                        });
                        // Optimise
                        (0, tools_1.runSVGO)(svg);
                    }
                    catch (err) {
                        // Invalid icon
                        console.error("Error parsing ".concat(name, ":"), err);
                        iconSet.remove(name);
                        return;
                    }
                    // Update icon
                    iconSet.fromSVG(name, svg);
                });
                exported = JSON.stringify(iconSet["export"](), null, '\t') + '\n';
                // Save to file
                return [4 /*yield*/, fs_1.promises.writeFile("./".concat(iconSet.prefix, ".json"), exported, 'utf8')];
            case 2:
                // Save to file
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
