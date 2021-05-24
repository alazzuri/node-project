import { createConnection } from "typeorm";
import { Author } from "../entity/author.entity";
import { Book } from "../entity/book.entity";
import { User } from "../entity/user.entity";
import { enviroment } from "./enviroment";

const { DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME } = enviroment;

export async function connect() {
  await createConnection({
    type: "postgres",
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [Author, Book, User],
  });

  console.log(`Database connected ✅`);
}
