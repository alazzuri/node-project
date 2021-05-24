import { getRepository, Repository } from "typeorm";
import { LoginInput, RegisterInput } from "../../inputTypes/user.types";
import { User } from "../../entity/user.entity";
import { parseRegisterData } from "./utils";
import { validatePassword } from "./bcrypt";
import { signWithJwt } from "./jwt";

export class AuthService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async registerUser(input: RegisterInput): Promise<User> {
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

  async validateCredentialsAndLogin(input: LoginInput): Promise<String> {
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
