import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection, Connection } from 'typeorm';

import BookResolver from './BookResolver';

const main = async () => {
	const connection: Connection = await createConnection();
	console.log('🥭  GraphQL server connected to Mongo');

	const schema = await buildSchema({
		resolvers: [BookResolver]
	});
	const server = new ApolloServer({
		context: ({ req }) => {
			const auth = req.headers && req.headers.authorization || '';

			// Replace following line by any other authentication check
			if (auth !== 'valid-token') return { authorizedUser: false };
			return { authorizedUser: true };
		},
		schema
	});

	await server.listen(4000);
	console.log('🚀  GraphQL server has started!');
}

main();
