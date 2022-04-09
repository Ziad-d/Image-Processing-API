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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var promises_1 = __importDefault(require("fs/promises"));
var imageResizer_1 = __importDefault(require("../../helpers/imageResizer"));
var imageRouter = express_1.default.Router();
imageRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, height, width, filePathImage, filePathThumb, fullImg, existingThumb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filename = req.query["filename"];
                height = req.query["height"]
                    ? parseInt(req.query["height"], 10)
                    : null;
                width = req.query["width"]
                    ? parseInt(req.query["width"], 10)
                    : null;
                if (!filename || !height || !width) {
                    res.status(400).send("Please make sure url contains correct filename, height and width params");
                    return [2 /*return*/];
                }
                filePathImage = "".concat(path_1.default.resolve(__dirname, "../../../assets/full/".concat(filename, ".jpg")));
                filePathThumb = "".concat(path_1.default.resolve(__dirname, "../../../assets/thumb/".concat(filename, "-").concat(height, "x").concat(width, ".jpg")));
                return [4 /*yield*/, promises_1.default.stat(filePathImage).catch(function () {
                        res.status(404).send("Image does not exist");
                        return null;
                    })];
            case 1:
                fullImg = _a.sent();
                if (!fullImg) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, promises_1.default
                        .stat(filePathThumb)
                        .catch(function () {
                        return null;
                    })];
            case 2:
                existingThumb = _a.sent();
                if (existingThumb) {
                    promises_1.default.readFile(filePathThumb)
                        .then(function (thumbData) {
                        res.status(200).contentType("jpg").send(thumbData);
                    })
                        .catch(function () {
                        res.status(500).send("Error occured processing the image");
                    });
                }
                else {
                    // resizing the image
                    imageResizer_1.default
                        .resizeImage({
                        filePathImage: filePathImage,
                        filePathThumb: filePathThumb,
                        height: height,
                        width: width,
                    })
                        .then(function (resizedImage) {
                        res.status(200).contentType("jpg").send(resizedImage);
                    })
                        .catch(function () {
                        res.status(500).send("Error occured processing the image");
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = imageRouter;