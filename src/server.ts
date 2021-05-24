import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book.resolver";
import { AuthorResolver } from "./resolvers/author.resolvers";
import { UserResolver } from "./resolvers/user.resolvers";

export async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthorResolver, BookResolver, UserResolver],
    }),
  });

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  return app;
}
