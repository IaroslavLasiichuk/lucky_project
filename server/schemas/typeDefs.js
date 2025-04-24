const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar Upload

  type User {
    _id: ID
    username: String
    jobs: [Job]!
  
  }

  type Job {
    _id: ID
    date: String!
    startTime: String
    endTime: String
    username: String!
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    user(username: String!): User
    jobs: [Event]!
  }

  type Mutation {
    registration(
      username: String!
      email: String!
      password: PasswordInput!
    ): ConfirmResponse
    login(email: String!, password: PasswordInput!): Auth
    refreshAccessToken(refreshToken: String!): Auth
    logout(id: ID): Boolean
    forgotPassword(email: String!): Message
    resetPassword(passwordResetToken: String, password: PasswordInput!): Message
    confirm(verificationToken: String): ConfirmResponse
    addEvent(
      date: String!
      startTime: String!
      endTime: String!
      carPlate: String!
      username: String!
      parkingSpotId: String
      authorId: ID!
    ): Event
   
    addSurvey(
      rate: String!
      comment: String
      features:[String]
      featureComment: String
    ): Survey
    removeJob(jobId: ID!, date: String!): Job
    updateUsername(username: String!): Message
    updatePassword(password: PasswordInput!): Message
  }

  type Subscription {
    jobAdded: Event
    jobRemoved: Event 
    userStatus: UserStatus
  }
`;

module.exports = typeDefs;
