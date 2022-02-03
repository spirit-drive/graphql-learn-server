import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Message {
    id: ID!
    text: String!
  }

  input UserFilters {
    ids: [ID!]!
  }

  type Percent {
    percent: Int!
  }

  type Money {
    amount: Int!
    currency: String!
  }

  union UnionValue = Percent | Money

  type Query {
    profile: User
    users(filters: UserFilters): [User]!
    messages: [Message]!
    unionValues: [UnionValue]!
  }

  type Mutation {
    editProfile(name: String!, email: String!): User!
    editUser(id: ID!, name: String!, email: String!): User!
    addUser(name: String!, email: String!): [User]!
    sendMessage(text: String!): [Message]
  }

  type Subscription {
    messageWasSent: [Message]
  }
`;
