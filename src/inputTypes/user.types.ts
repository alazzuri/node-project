import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String)
  firstName!: String;

  @Field(() => String)
  lastName!: String;

  @Field(() => String)
  email!: String;

  @Field(() => String)
  password!: String;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email!: String;

  @Field(() => String)
  password!: String;
}
