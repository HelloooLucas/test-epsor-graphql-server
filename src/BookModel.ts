import { Entity, ObjectID, ObjectIdColumn, Column, getMongoManager } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export default class Book {

	@Field(() => ID)
	@ObjectIdColumn()
	id: string;

	@Field(() => String)
	@Column()
	author: string;

	@Field(() => String)
	@Column()
	title: string;

	@Field(() => Number)
	@Column()
	stock: number;
}
