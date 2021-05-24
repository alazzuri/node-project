import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Book } from "./book.entity";

@ObjectType()
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn()
  id!: Number;

  @Field(() => String)
  @Column()
  firstName!: String;

  @Field(() => String)
  @Column()
  lastName!: String;

  @Field(() => [Book], { nullable: true })
  @OneToMany(() => Book, (book) => book.author, { nullable: true })
  books!: Book[];

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
