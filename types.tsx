/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {User} from "./API";

export type RootStackParamList = {
  Login: undefined;
  Subscribe: undefined;
  ConfirmSignUp: undefined;
  Root: undefined;
  Profile: undefined;
  NewTweet: undefined;
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
  styles?: object
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
  image?: string;
};

export type UserInputProps = {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
};

export type UserFleetPreviewProps = {
  user: UserType
};

export type UserFleetListProps = {};
