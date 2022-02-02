/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet($owner: String) {
    onCreateTweet(owner: $owner) {
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
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet($owner: String) {
    onUpdateTweet(owner: $owner) {
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
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet($owner: String) {
    onDeleteTweet(owner: $owner) {
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
export const onCreateFleet = /* GraphQL */ `
  subscription OnCreateFleet($owner: String) {
    onCreateFleet(owner: $owner) {
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
export const onUpdateFleet = /* GraphQL */ `
  subscription OnUpdateFleet($owner: String) {
    onUpdateFleet(owner: $owner) {
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
export const onDeleteFleet = /* GraphQL */ `
  subscription OnDeleteFleet($owner: String) {
    onDeleteFleet(owner: $owner) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($owner: String) {
    onCreateLike(owner: $owner) {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($owner: String) {
    onUpdateLike(owner: $owner) {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($owner: String) {
    onDeleteLike(owner: $owner) {
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
