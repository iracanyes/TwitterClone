export const listUsersWithFleets = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          items {
            id
            type
            text
            image
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
