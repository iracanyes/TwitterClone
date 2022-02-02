/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      name
      email
      accountType
      status
      image
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fleets {
        items {
          id
          type
          text
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      name
      email
      accountType
      status
      image
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fleets {
        items {
          id
          type
          text
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      name
      email
      accountType
      status
      image
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fleets {
        items {
          id
          type
          text
          image
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTweet = /* GraphQL */ `
  mutation CreateTweet(
    $input: CreateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    createTweet(input: $input, condition: $condition) {
      id
      content
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
      id
      content
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
      id
      content
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFleet = /* GraphQL */ `
  mutation CreateFleet(
    $input: CreateFleetInput!
    $condition: ModelFleetConditionInput
  ) {
    createFleet(input: $input, condition: $condition) {
      id
      type
      text
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFleet = /* GraphQL */ `
  mutation UpdateFleet(
    $input: UpdateFleetInput!
    $condition: ModelFleetConditionInput
  ) {
    updateFleet(input: $input, condition: $condition) {
      id
      type
      text
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFleet = /* GraphQL */ `
  mutation DeleteFleet(
    $input: DeleteFleetInput!
    $condition: ModelFleetConditionInput
  ) {
    deleteFleet(input: $input, condition: $condition) {
      id
      type
      text
      image
      userID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      userID
      tweetID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tweet {
        id
        content
        image
        userID
        user {
          id
          username
          name
          email
          accountType
          status
          image
          createdAt
          updatedAt
          owner
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      userID
      tweetID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tweet {
        id
        content
        image
        userID
        user {
          id
          username
          name
          email
          accountType
          status
          image
          createdAt
          updatedAt
          owner
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      userID
      tweetID
      user {
        id
        username
        name
        email
        accountType
        status
        image
        tweets {
          nextToken
        }
        fleets {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tweet {
        id
        content
        image
        userID
        user {
          id
          username
          name
          email
          accountType
          status
          image
          createdAt
          updatedAt
          owner
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
