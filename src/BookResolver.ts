import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { getMongoManager } from 'typeorm';

import Book from './BookModel';
import CreateBookInput from './CreateBookInput';
import { sendKafkaMessage } from './utils';

@Resolver()
export default class BookResolver {
	@Query(() => [Book])
	async books() {
		const manager = getMongoManager();
		const books = await manager.find(Book);
		return books;
	}

	@Mutation(() => String)
	async createBook(
		@Arg("data") data: CreateBookInput,
		@Ctx() ctx: { authorizedUser: Boolean }
	) {
		if (ctx.authorizedUser) sendKafkaMessage(data);

		// Didn't really know what to do about the "uuid" thing, but I still receive acknowledgement from Kafka
		return ctx.authorizedUser ? 'Book successfully created' : 'User not authorized';
	}
}
