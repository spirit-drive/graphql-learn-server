import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';
// @ts-ignore
import * as db from './db';

export const resolvers: ApolloServerExpressConfig['resolvers'] = {
  Mutation: {
  },
  Query: {
    profile: () => {
      return db.profile;
    },
    users: (_, { filters }) => {
      if (!filters) return db.users;
      return db.users?.filter((i: { id: string[] }) => filters.ids?.includes(i.id));
    },
    messages: () => {
      return db.messages;
    },
  },
};
