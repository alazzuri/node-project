import { AuthorResolver } from "./author.resolvers";
import { BookResolver } from "./book.resolver";
import { UserResolver } from "./user.resolvers";

export const allResolvers = [AuthorResolver, BookResolver, UserResolver];
