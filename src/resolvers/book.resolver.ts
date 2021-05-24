import { Resolver, Query, InputType, Field, Arg, Mutation } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { Author } from "../entity/author.entity";
import { Book } from "../entity/book.entity";

@InputType()
class BookIdInput {
  @Field(() => Number)
  id!: Number;
}

@InputType()
class BookInput {
  @Field(() => String)
  title!: String;

  @Field(() => Number)
  author!: Number;
}

@InputType()
class UpdateBookInput {
  @Field(() => Number)
  id!: Number;

  @Field(() => String)
  title?: String;

  @Field(() => Number)
  author?: Number;
}

@Resolver()
export class BookResolver {
  bookService: Repository<Book>;
  authorService: Repository<Author>;

  constructor() {
    this.bookService = getRepository(Book);
    this.authorService = getRepository(Author);
  }

  @Query(() => [Book])
  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.bookService.find({ relations: ["author"] });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Query(() => Book)
  async getOneBook(
    @Arg("input", () => BookIdInput) input: BookIdInput
  ): Promise<Book> {
    try {
      const existingBook = await this.bookService.findOne(
        { ...input },
        { relations: ["author"] }
      );

      if (!existingBook) throw new Error("Book does not exist");

      return existingBook;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => Book)
  async createBook(
    @Arg("input", () => BookInput) input: BookInput
  ): Promise<Book> {
    try {
      const existingAuthor = await this.authorService.findOne({
        id: input.author,
      });

      if (!existingAuthor) throw new Error("Author does not exist");

      const createdBook = await this.bookService.insert({
        ...input,
        author: existingAuthor,
      });

      const response = await this.bookService.findOne(
        createdBook.identifiers[0].id,
        { relations: ["author"] }
      );

      if (!response) throw new Error("An error has occurred");

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg("input", () => UpdateBookInput) input: UpdateBookInput
  ): Promise<Book> {
    try {
      const existingBook = await this.bookService.findOne({ id: input.id });

      if (!existingBook) throw new Error("Book does not exist");

      let author = existingBook.author;

      if (input.author) {
        const author = await this.authorService.findOne({
          id: input.author,
        });

        if (!author) throw new Error("Author does not exist");
      }

      await this.bookService.save({
        ...input,
        author,
      });

      return existingBook;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => Boolean)
  async deleteBook(
    @Arg("input", () => BookIdInput) input: BookIdInput
  ): Promise<boolean> {
    try {
      const existingBook = await this.bookService.findOne({ id: input.id });

      if (!existingBook) throw new Error("Book does not exist");

      await this.bookService.delete({
        ...input,
      });

      return true;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
