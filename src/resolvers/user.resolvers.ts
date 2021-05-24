import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../entity/user.entity";
import { LoginInput, RegisterInput } from "../inputTypes/user.types";
import { AuthService } from "../services/auth";

@Resolver()
export class UserResolver {
  userService: AuthService;

  constructor() {
    this.userService = new AuthService();
  }

  @Mutation(() => User)
  async register(
    @Arg("input", () => RegisterInput) input: RegisterInput
  ): Promise<User | undefined> {
    return await this.userService.registerUser(input);
  }

  @Mutation(() => String)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput
  ): Promise<String | undefined> {
    return await this.userService.validateCredentialsAndLogin(input);
  }
}
