/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
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
      }
      likes {
        items {
          id
          userID
          tweetID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $id: ID
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTweets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFleet = /* GraphQL */ `
  query GetFleet($id: ID!) {
    getFleet(id: $id) {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFleets = /* GraphQL */ `
  query ListFleets(
    $id: ID
    $filter: ModelFleetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFleets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tweetsByDate = /* GraphQL */ `
  query TweetsByDate(
    $createdAt: String
    $sortDirection: ModelSortDirection
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tweetsByDate(
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
