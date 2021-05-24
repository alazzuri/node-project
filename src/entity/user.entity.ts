import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Book } from "./book.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: Number;

  @Field(() => String)
  @Column()
  firstName!: String;

  @Field(() => String)
  @Column()
  lastName!: String;

  @Field(() => String)
  @Column()
  email!: String;

  @Field(() => String)
  @Column()
  password!: String;

  @Field(() => Number)
  @Column()
  debt!: Number;

  @OneToMany(() => Book, (book) => book.author, { nullable: true })
  books!: Book[];

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
