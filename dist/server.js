"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const loggers_1 = require("./middleware/loggers");
const Port = process.env.PORT || 8000;
app_1.serverHttp.listen(Port, () => {
    (0, loggers_1.logInfo)(`Server is running on port ${Port}`);
    (0, loggers_1.logInfo)(`http://localhost:${Port}`);
});
