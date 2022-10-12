import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";

dotenv.config();

import { router } from "./routes";
import { logRequest, logError } from "./middleware/loggers";

const app = express();
app.use(cors());
app.use(logError);
app.use(logRequest);
app.use(express.json());
app.use(router);

const serverHttp = http.createServer(app);
export { serverHttp };
