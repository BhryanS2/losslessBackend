import { serverHttp } from "./app";
import { logInfo } from "./middleware/loggers";

const Port = process.env.PORT || 8000;

serverHttp.listen(Port, () => {
  logInfo(`Server is running on port ${Port}`);
  logInfo(`http://localhost:${Port}`);
});
