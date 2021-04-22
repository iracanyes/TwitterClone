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
  TabOne: undefined;
  TabTwo: undefined;
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
