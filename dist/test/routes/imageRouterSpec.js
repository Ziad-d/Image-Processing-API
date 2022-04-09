"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../../index"));
describe('GET /api/images', function () {
    it('tests if called without parameters, responds with 400', function (done) {
        (0, supertest_1.default)(index_1.default).get('/api/images').expect(400);
        done();
    });
    it('tests if called with a missing parameter, responds with 400 ', function (done) {
        (0, supertest_1.default)(index_1.default).get('/api/images?filename=test&height=100').expect(400);
        done();
    });
    it('tests if called correctly but image does not exist, responds with 404', function (done) {
        (0, supertest_1.default)(index_1.default).get('/api/images?filename=test&height=100&width=100').expect(404);
        done();
    });
    it('tests if called correctly and image exist, responds with 200', function (done) {
        (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord&height=100&width=100').expect(200);
        done();
    });
    it('test created a thumb', function (done) {
        (0, supertest_1.default)(index_1.default)
            .get('/api/images?filename=fjord&height=100&width=100')
            .then(function () {
            promises_1.default.stat(path_1.default.resolve(__dirname, '../../../assets/thumb/fjord-100x100.jpg')).then(function (fileStat) {
                return expect(fileStat).not.toBeNull();
            });
            done();
        });
    });
});
