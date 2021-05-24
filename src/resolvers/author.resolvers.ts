import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { Author } from "../entity/author.entity";
import {
  AuthorIdInput,
  AuthorInput,
  UpdateAuthorIdInput,
} from "../inputTypes/author.types";

@Resolver()
export class AuthorResolver {
  authorRepository: Repository<Author>;

  constructor() {
    this.authorRepository = getRepository(Author);
  }

  @Query(() => [Author])
  async getAllAuthors(): Promise<Author[] | undefined> {
    try {
      return await this.authorRepository.find({ relations: ["books"] });
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => Author)
  async getOneAuthor(
    @Arg("input", () => AuthorIdInput) input: AuthorIdInput
  ): Promise<Author | undefined> {
    try {
      const existingAuthor = await this.authorRepository.findOne(
        {
          ...input,
        },
        { relations: ["books"] }
      );

      if (!existingAuthor) throw new Error("Author does not exist");

      return existingAuthor;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => Author)
  async createAuthor(
    @Arg("input", () => AuthorInput) input: AuthorInput
  ): Promise<Author | undefined> {
    try {
      const createdAuthor = await this.authorRepository.insert({ ...input });

      const result = await this.authorRepository.findOne(
        createdAuthor.identifiers[0].id,
        { relations: ["books"] }
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Arg("input", () => UpdateAuthorIdInput) input: UpdateAuthorIdInput
  ): Promise<Author | undefined> {
    try {
      const existingAuthor = await this.authorRepository.findOne({
        id: input.id,
      });

      if (!existingAuthor) throw new Error("Author does not exist");

      return await this.authorRepository.save({ ...input });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => Boolean)
  async deleteAuthor(
    @Arg("input", () => AuthorIdInput) input: AuthorIdInput
  ): Promise<Boolean> {
    try {
      const existingAuthor = await this.authorRepository.findOne({
        ...input,
      });

      if (!existingAuthor) throw new Error("Author does not exist");

      await this.authorRepository.delete({ ...input });
      return true;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
