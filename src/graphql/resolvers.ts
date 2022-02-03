import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const db = {
  books: [
    {
      title: 'Title',
      author: 'Author',
    },
  ],
  profile: {
    id: 'id',
    name: 'First Name',
    email: 'email@email.ru',
  },
  users: [
    {
      id: '1',
      name: 'User 1',
      email: 'email@email.ru',
    },
    {
      id: '2',
      name: 'User 2',
      email: 'email@email.ru',
    },
    {
      id: '3',
      name: 'User 3',
      email: 'email@email.ru',
    },
  ],
  messages: [
    {
      id: '1',
      text: 'Message by default',
    },
  ],
  unionValues: [
    {
      percent: 23,
      __typename: 'Percent',
    },
    {
      amount: 100,
      currency: 'RU',
      __typename: 'Money',
    },
  ],
};

export const resolvers: ApolloServerExpressConfig['resolvers'] = {
  Subscription: {
    messageWasSent: {
      subscribe: () => pubsub.asyncIterator(['SEND_MESSAGE']),
    },
  },
  Mutation: {
    sendMessage: (_, { text }) => {
      const id = Math.random().toString(16);
      db.messages.push({ text, id });
      pubsub.publish('SEND_MESSAGE', { messageWasSent: db.messages });
      return db.messages;
    },
    editProfile: (_, { email, name }) => Object.assign(db.profile, { email, name }),
    addUser: (_, { email, name }) => {
      const id = Math.random().toString(16);
      const length = db.users.push({ email, name, id });
      return db.users[length - 1];
    },
    editUser: (_, { id, email, name }) => {
      const user = db.users.find((u) => u.id === id);
      if (!user) return new Error('user not found');
      return Object.assign(user, { email, name });
    },
  },
  Query: {
    profile: () => db.profile,
    unionValues: () => db.unionValues,
    users: (_, { filters }) => {
      if (!filters) return db.users;
      return db.users?.filter((i) => filters.ids?.includes(i.id));
    },
    messages: () => db.messages,
  },
};
