import * as express from 'express';
// import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';

async function startApolloServer() {
  const app = express();

  // app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req }) => ({
      locale: req.headers.locale,
    }),
  });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}${server.graphqlPath}`));
}

startApolloServer();
