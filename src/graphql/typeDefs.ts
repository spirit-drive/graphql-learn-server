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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    profile: User
    users(filters: UserFilters): [User]!
    messages: [Message]!
  }

  type Mutation {
    editProfile(name: String!, email: String!): User!
  }
`;
