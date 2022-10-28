"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 9000; // default port to listen
app.use(express_1.default.urlencoded({
    extended: true,
}));
const allowedOrigins = ['http://localhost:8080', 'http://localhost:8000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)());
const dataDir = process.env.DEVELOPMENT ? `${__dirname}/../../data` : '/data';
// tslint:disable-next-line:no-console
console.log(`DATA DIRECTORY IS: ${dataDir}`);
app.use('/data', express_1.default.static(dataDir));
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
// define a route handler for the default home page
app.get("/api/videoFiles", (req, res) => {
    const files = fs_1.default.readdirSync(dataDir, {
        withFileTypes: true
    });
    const filtered = files.filter((item) => item.isFile() && item.name.endsWith('.mp4')).map((item) => item.name);
    res.json(filtered);
});
app.get("/api/jsonFiles", (req, res) => {
    const files = fs_1.default.readdirSync(dataDir, {
        withFileTypes: true
    });
    const filtered = files.filter((item) => item.isFile() && item.name.endsWith('.json')).map((item) => item.name);
    res.json(filtered);
});
//# sourceMappingURL=index.js.map