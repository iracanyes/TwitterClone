/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {User} from "./API";
import {IFleet, IUser} from "./types/interfaces";

export type AppProps = { oAuthUser: any; oAuthError: any; hostedUISignIn: any; facebookSignIn: any; googleSignIn: any; amazonSignIn: any; };

export type RootStackParamList = {
  Login: undefined;
  Subscribe: undefined;
  ConfirmSignUp: undefined;
  Fleet: undefined;
  Root: undefined;
  Profile: undefined;
  NewTweet: undefined;
  NewFleet: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type ProfileBottomTabParamList = {
  Profile: undefined;
  UpdateProfile: undefined;
};

export type NewTweetNavigatorParamList = {
  NewTweetScreen: undefined;
};

export type ProfilePictureProps = {
  image: string,
  size?: number,
  styles?: {
    profileButton?: object,
    profileImage?: object
  },
  onPress: () => void
};

export type MessagesNavigatorParamList = {
  MessagesScreen: undefined;
};

export type TweetProps = {
  tweet: TweetType;
};

export type LeftContainerProps = {
  user: UserType
};

export type MainContainerProps = {
  tweet: TweetType
};

export type TweetType = {
  id: string;
  user: UserType;
  createdAt: string;
  content: String;
  image?: string;
  likes: { items: [LikeType]};
  numberOfComments: number;
  numberOfRetweets: number;
  numberOfLikes: number;
};

export type LikeType = {
  id: string;
  userID?: string;
  tweetID?: string;
  user?: UserType;
  tweet?: TweetType;
};

export type UserType = {
  id: string;
  username?: string;
  name?: string;
  email?: string;
  image: string;
  fleets?: {
    items: [FleetType];
  }
};

export type FleetType = {
  id: string;
  type: string;
  image: string;
  text: string;
};

export type UserInputProps = {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
};

export type UserFleetPreviewProps = {
  index: number;
  fleet: IFleet,
  fleets: IFleet[]|null;
};

export type UserFleetListProps = {};
