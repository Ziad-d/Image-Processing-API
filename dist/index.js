"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 3000;
app.use("/api", index_1.default);
app.get("/", function (_, res) {
    res.status(200).send("Server is working!");
});
app.listen(port, function () {
    // make sure thumb folder exists
    var thumbPath = path_1.default.resolve(__dirname, "../assets/thumb");
    if (!fs_1.default.existsSync(thumbPath)) {
        fs_1.default.mkdirSync(thumbPath);
    }
    console.log("Running on port ".concat(port));
});
exports.default = app;
