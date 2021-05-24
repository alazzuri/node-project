import { Field, InputType } from "type-graphql";

@InputType()
export class AuthorInput {
  @Field()
  firstName!: String;

  @Field()
  lastName!: String;
}

@InputType()
export class UpdateAuthorIdInput {
  @Field()
  id!: Number;

  @Field()
  firstName?: String;

  @Field()
  lastName?: String;
}

@InputType()
export class AuthorIdInput {
  @Field(() => Number)
  id!: Number;
}
