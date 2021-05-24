import { connect } from "./config/typeorm";
import { enviroment } from "./config/enviroment";
import { startServer } from "./server";

(async function main() {
  const port: number = Number(enviroment?.PORT);

  await connect();
  const app = await startServer();

  app.listen(port);

  console.log(`Server started on port ${port} 🚀🚀🚀`);
})();
