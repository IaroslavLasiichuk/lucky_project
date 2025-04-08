const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar Upload

  type User {
    _id: ID
    username: String
    role: String
    carPlate: String
    active: Boolean 
    admin: Boolean  
    events: [Event]!
    guests: [Guest]!
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
    bookDesk(
      date: String!
      startTime: String!
      endTime: String!
      username: String!
      deskId: String
      authorId: ID!
    ): DeskBooking
    addSurvey(
      rate: String!
      comment: String
      features:[String]
      featureComment: String
    ): Survey
    addGuest(
      date: String!
      startTime: String!
      endTime: String!
      relationship: String!
      guestname: String!
      username: String!
    ): Guest
    addParkingSpot(
      name: String! 
      availableFor: String
    ): ParkingSpot
    addDesk(
      name: String! 
    ): Desk
    removeParkingSpot(_id: ID!): ParkingSpot
    removeDesk(_id: ID!): Desk
    removeEvent(eventId: ID!, date: String!): Event
    removeDeskBooking(deskBookingId: ID!): DeskBooking
    removeGuest(guestId: ID!, date: String!): Guest
    updateUsername(username: String!): Message
    updatePassword(password: PasswordInput!): Message
    deleteUser(_id: ID!): Message
    addRole(role: String!): Message
    addCarPlate(carPlate: String!): Message
    updateUserStatus(userId: ID!, online: Boolean!): UserStatus
    disactivateAccount(_id: ID!): Message
    activateAccount(_id: ID!): Message
    uploadImage(_id: ID!, file: Upload!): Message
  }

  type Subscription {
    eventAdded: Event
    eventRemoved: Event
    guestAdded: Guest
    guestRemoved: Guest
    userStatus: UserStatus
    deskBooked: Desk
    carPlateUpdated: User 
  }
`;

module.exports = typeDefs;
