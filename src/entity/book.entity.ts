import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Author } from "./author.entity";

@ObjectType()
@Entity()
export class Book {
  @Field()
  @PrimaryGeneratedColumn()
  id!: Number;

  @Field(() => String)
  @Column()
  title!: String;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  author!: Author;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
