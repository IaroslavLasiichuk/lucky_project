const Subscription = require("./Subscriptions");
const Query = require("./Queries");
const Mutation = require("./Mutations");

// Define GraphQL resolvers that handle user-related queries and mutations.
const resolvers = {
  Subscription: Subscription,
  Query: Query,
  Mutation: Mutation
};

module.exports = resolvers;