import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { LoginInput, RegisterInput } from "../inputTypes/user.types";
import { validatePassword } from "../services/auth/bcrypt";
import { parseRegisterData } from "../services/auth/dataParser";
import { signWithJwt } from "../services/auth/jwt";

@Resolver()
export class UserResolver {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  @Mutation(() => User)
  async register(
    @Arg("input", () => RegisterInput) input: RegisterInput
  ): Promise<User | undefined> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: input.email },
      });

      if (existingUser) throw new Error("User already exists");

      const registerData = await parseRegisterData(input);

      const createdUser = await this.userRepository.insert({ ...registerData });

      const user = await this.userRepository.findOne(
        createdUser.identifiers[0].id
      );

      if (!user) throw new Error("An error has occured");

      return user;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => String)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput
  ): Promise<String | undefined> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: input.email },
      });

      if (!existingUser) throw new Error("User does not exist");

      const isPasswordValid = await validatePassword(
        input.password as string,
        existingUser.password as string
      );

      if (!isPasswordValid) throw new Error("Wrong Password");

      const jwt = signWithJwt({ email: input.email });

      return jwt;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
