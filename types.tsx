/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
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

export type ProfilePictureProps = {
  image: string,
  size?: number,
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
  numberOfComments: number;
  numberOfRetweets: number;
  numberOfLikes: number;
};

export type UserType = {
  id: string;
  username: string;
  name: string;
  image: string;
};
