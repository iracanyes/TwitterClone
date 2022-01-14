import Amplify, { Auth } from "aws-amplify";
import AWSAppSyncClient from "aws-appsync";
import awsconfig from "../src/aws-exports";


const clientAppSync = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    // @ts-ignore
    type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
    jwtToken: async () => ( await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

export default clientAppSync;