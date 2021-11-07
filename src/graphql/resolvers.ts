import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';

const db = {
  "books": [
    {
      "title": "Title",
      "author": "Author"
    }
  ],
  "profile": {
    "id": "id",
    "name": "First Name",
    "email": "email@email.ru"
  },
  "users": [
    {
      "id": "1",
      "name": "User 1",
      "email": "email@email.ru"
    },
    {
      "id": "2",
      "name": "User 2",
      "email": "email@email.ru"
    },
    {
      "id": "3",
      "name": "User 3",
      "email": "email@email.ru"
    }
  ],
  "messages": [
    {
      "id": "1",
      "text": "text 1"
    },
    {
      "id": "2",
      "text": "text 2"
    },
    {
      "id": "3",
      "text": "text 3"
    },
    {
      "id": "4",
      "text": "text 4"
    },
    {
      "id": "5",
      "text": "text 5"
    }
  ]
};

export const resolvers: ApolloServerExpressConfig['resolvers'] = {
  Mutation: {
    editProfile: (_, { email, name }) => {
      return Object.assign(db.profile, { email, name })
    }
  },
  Query: {
    profile: () => {
      return db.profile;
    },
    users: (_, { filters }) => {
      if (!filters) return db.users;
      return db.users?.filter((i) => filters.ids?.includes(i.id));
    },
    messages: () => {
      return db.messages;
    },
  },
};
